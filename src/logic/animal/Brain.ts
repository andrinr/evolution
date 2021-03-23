import type * as math from 'mathjs';
import type { Layer } from './Layer';

interface BrainParams {
    layers : Layer[],
}
/**
 * 
 */
export class Brain{

    protected layers : Layer[];

    /**
     * Initialize a new neural network, assuming fully connected 1D Layers
     */
    constructor(params : BrainParams){
        this.layers = params.layers;

        // Init all layers
        for (let i = 1; i < this.layers.length; i++){
            this.layers[i].init(this.layers[i-1])
        }
    }

    /**
     * Process data over all layers
     * @param input input data
     * @returns result
     */
    public process(input : math.matrix<number>) : math.matrix<number>{
        let tmp : math.matrix<number> = input;
        for (let i = 1; i < this.layers.length; i++){
            tmp = this.layers[i].process(tmp);
        }
        return tmp;
    }

    /**
     * Randomly mutates all layers
     * @param strength mutation strength
     * @returns this instance
     */
    public mutate(strength : number) : Brain{
        for (let i = 1; i < this.layers.length; i++){
            this.layers[i].mutate(strength);
        }
        return this;
    }

    /**
     * Make a deep copy clone of this brain
     * @returns clone
     */
    public clone() : Brain{
        const layerClones : Layer[] = [];
        for (let i = 1; i < this.layers.length; i++){
            layerClones.push(this.layers[i].clone());
        }
        return new Brain({layers : layerClones});
    }

    /**
     * Mate this brain with another, returns averaged child
     * @param partner mating partner
     * @returns child
     */
    public mate(partner : Brain) : Brain{
        if (this.layers.length != partner.layers.length){
            throw new Error("Layer: Mating partners must have same number of layers");
        }
        const layerChildren : Layer[] = [];
        for (let i = 1; i < this.layers.length; i++){
            layerChildren.push(this.layers[i].mate(partner.layers[i]));
        }

        return new Brain({layers: layerChildren});
    }
}