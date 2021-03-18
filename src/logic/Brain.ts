import * as math from 'mathjs';

/**
 * 
 */
export class Brain{
    protected layerSizes : number[];

    protected weights : math.matrix<number>;
    protected values : math.matrix<number>;

    /**
     * Initialize a new brain, assuming fully connected, only 1D Layers
     */
    constructor(layerSizes : number[], weights? : math.matrix<number>){

        const n = layerSizes.length;
        const m = math.max(layerSizes);
        
        this.weights = weights ? weights.clone() : math.random([n, m, m]);

        this.layerSizes = layerSizes;

    }

    input(data : math.matrix<number>){
        return math.subset(this.values, math.index([-1],[0,this.layerSizes[-1]]));
    }
 
    propagate(){

    }

    mutate(strength : number){
        math.add(this.weights, math.random(strength, this.weights.size()));
    }

    clone(){
        const brainClone = new Brain([...this.layerSizes]);

        // TODO: copy all weights

    }
}