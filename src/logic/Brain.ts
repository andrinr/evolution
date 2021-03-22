import * as math from 'mathjs';

type activationFunction = (value : number) => number;

interface BrainParams {
    layerSizes: number[],
    weights?: math.math<number>,
    activationFunction?: activationFunction,
}
/**
 * 
 */
export class Brain{
    protected layerSizes : number[];

    protected weights : math.matrix<number>;
    protected values : math.matrix<number>;

    protected activationFunction : activationFunction;

    /**
     * Initialize a new neural network, assuming fully connected 1D Layers
     */
    constructor(params : BrainParams){

        this.layerSizes = params.layerSizes;

        const n = this.layerSizes.length;
        const m = math.max(this.layerSizes);

        console.log(`sizes: ${n} and ${m}`);
        
        this.weights = params.weights ? params.weights : math.random([n, m, m]);
        this.activationFunction = params.activationFunction ? params.activationFunction : this.logisticFunction;
    
        this.values = math.zeros([n,m]);
    }

    logisticFunction : activationFunction = (x: number) =>{
        return 1 / ( 1 + Math.exp(-x));
    }

    process(input : math.matrix<number>){
        const index = math.index(0,math.range(0,math.size(input)[0]));
        
        console.log(math.subset(this.values, index));
        // TODO: fix dimension error
        math.subset(this.values, index, input);
        /*this.propagate();
        return math.subset(this.values, math.index(-1,[0,this.layerSizes[-1]]));*/
    }
  
    propagate(){
        // TODO: implement propagation
    }

    mutate(strength : number){
        math.add(this.weights, math.random(strength, math.size(this.weights)));
    }

    clone(){
        return new Brain({layerSizes : [...this.layerSizes], weights : this.weights.clone()});
    }
}