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
        
        this.weights = weights ? weights : math.random([n, m, m]);
        this.values = math.zeros([n,m]);

        this.layerSizes = layerSizes;

    }

    input(data : math.matrix<number>){
        const inputIndex = math.index(0,[0,math.size(data)[0]-1])
        this.values.subset(inputIndex, data);
        this.propagate();
        return math.subset(this.values, math.index(-1,[0,this.layerSizes[-1]]));
    }
 
    propagate(){

    }

    mutate(strength : number){
        math.add(this.weights, math.random(strength, math.size(this.weights)));
    }

    clone(){
        const brainClone = new Brain([...this.layerSizes], this.weights.clone());

        // TODO: copy all weights

    }
}