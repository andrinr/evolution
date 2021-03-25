import * as math from 'mathjs';

type activationFunction = (value : number) => number;

interface LayerParams 
{
    breadth?: number,
    weights?: math.matrix<number>,
    activationFunction?: activationFunction
}

export class Layer
{
    protected weights : math.matrix<number>;
    protected breadth : number;
    protected activationFunction : activationFunction;

    constructor(params : LayerParams)
    {
        if (params.weights){
            this.weights = params.weights;
        } 
        else if (params.breadth){
            this.breadth = params.breadth;
        }
        else{
            throw new Error(`Layer: Must provide either breadth or weights.`);
        }

        this.activationFunction = params.activationFunction ? params.activationFunction : this.logisticFunction;
    }

    public process(input : math.matrix<number>) : math.matrix<number>
    {
        //const multiplication : math.matrix<number> = math.multiply(this.weights, input);
        /*return math.map(function(value, index, matrix){
            return this.
        })*/

        // deepcode ignore UseArrowFunction: Already uses an arrow function
        return math.multiply(this.weights, input).map(
            (value) => {return this.activationFunction(value)}
        );
    }

    public init(prevLayer : Layer) : void 
    {
        this.weights = math.random([this.breadth, prevLayer.breadth]);
    }

    public clone() : Layer 
    {
        return new Layer({weights: math.clone(this.weights)});
    }

    public mutate(strength : number)
    {
        math.add(this.weights, math.random(math.size(this.weights), strength));
    }

    public mate(partner : Layer) : Layer
    {
        return new Layer({weights: math.multiply(math.add(this.weights, partner.weights), 0.5)});
    }

    private logisticFunction : activationFunction = (x: number) =>
    {
        return 1 / ( 1 + Math.exp(-x));
    }
}