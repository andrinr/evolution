import type * as math from 'mathjs';
import type { Layer } from './Layer';

type activationFunction = (value : number) => number;

interface BrainParams {
    layers : Layer[],
    activationFunction?: activationFunction,
}
/**
 * 
 */
export class Brain{

    protected activationFunction : activationFunction;
    protected layers : Layer[];

    /**
     * Initialize a new neural network, assuming fully connected 1D Layers
     */
    constructor(params : BrainParams){

        this.activationFunction = params.activationFunction ? params.activationFunction : this.logisticFunction;
        this.layers = params.layers;

        // Init all layers
        for (let i = 1; i < this.layers.length; i++){
            this.layers[i].init(this.layers[i-1])
        }
    }

    private logisticFunction : activationFunction = (x: number) =>{
        return 1 / ( 1 + Math.exp(-x));
    }

    public process(input : math.matrix<number>){
        
        let tmp : math.matrix<number> = input;
        for (let i = 1; i < this.layers.length; i++){
            tmp = this.layers[i].process(tmp);
        }
        
        return tmp;
    }

    public mutate(strength : number){
        for (let i = 1; i < this.layers.length; i++){
            this.layers[i].mutate(strength);
        }
    }

    public clone(){
        const layerClones : Layer[] = [];
        for (let i = 1; i < this.layers.length; i++){
            layerClones.push(this.layers[i].clone());
        }
        return new Brain({layers : layerClones});
    }
}   