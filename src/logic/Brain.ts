import { Neuron } from './Neuron';

type neuronLambda = (neuron: Neuron) => void;

/**
 * 
 */
export class Brain{
    protected neurons : Neuron[][];
    protected layerSizes : number[];

    /**
     * Initialize a new brain
     * @param layerSizes layers sizes given as array
     */
    constructor(layerSizes : number[]){

        this.neurons = [];
        this.layerSizes = layerSizes;

        // Initialize neurons
        for (const layerSize of this.layerSizes){
            const subararray = [];
            for (let i = 0; i < layerSize; i++){
                subararray.push(new Neuron());
            }
            this.neurons.push(subararray);
        }

        // Make layers fully connected
        for (let i = 0; i < this.neurons.length - 1; i++){
            for (let j = 0; j < this.neurons[i].length; j++){
                for (let k = 0; k < this.neurons[i+1].length; k++){
                    this.neurons[i][j].connect(this.neurons[i][k], Math.random());
                }
            }
        }
    }

    /**
     * Propagate on all neurons
     */
    propagate(){
        const propagateLambda : neuronLambda = (neuron : Neuron) => {
            neuron.propagate()
        }
        this.onAllNeurons(propagateLambda);
    }

    /**
     * Mutates all neurons
     * @param strength mutation strength
     */
    mutate(strength : number){
        const mutateLambda : neuronLambda = (neuron : Neuron) => {
            neuron.mutate(strength);
        }
        this.onAllNeurons(mutateLambda);
    }

    clone(){
        const brainClone = new Brain([...this.layerSizes]);

        // TODO: copy all weights

    }

    /**
     * Executes lambda on all neurons
     * @param lambda 
     */
    onAllNeurons(lambda : neuronLambda){
        for (const subararray of this.neurons){
            for (const neuron of subararray){
                lambda(neuron);
            }
        }
    }
}