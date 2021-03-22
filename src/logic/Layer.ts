import * as math from 'mathjs';

export class Layer
{
    protected weights : math.matrix<number>;
    protected breadth : number;

    constructor(parameter: number | math.matrix<number>){
        if (typeof parameter == "object"){
            this.weights = parameter;
        } 
        else if (typeof parameter == "number"){
            this.breadth = parameter;
        }
    }

    public process(input : math.matrix<number>) : math.matrix<number>{
        return math.multiply(this.weights, input);
    }

    public init(prevLayer : Layer) : void {
        this.weights = math.random([this.breadth, prevLayer.breadth]);
    }

    public clone() : Layer {
        return new Layer(this.weights.clone());
    }

    public mutate(strength : number){
        math.add(this.weights, math.random(math.size(this.weights), strength));
    }
}