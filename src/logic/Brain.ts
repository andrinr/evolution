import { Neuron } from './node';

export class Brain{
    neurons : Neuron[];
    layerSizes : number[];

    constructor(layerSizes : number[]){

        this.layerSizes = layerSizes;
        let count = 0;

        for (const layerSize of this.layerSizes){
            count += layerSize;
        }

        this.neurons = [];
        for (let i = 0; i < count; i++){
            this.neurons.push(new Neuron());
        }

        for (){
            for (let)
        }


    }

    propagate(){
        for (const layer of this.layers){
            layer.propagate();
        }
    }

    interbreed(factor : number){    
        const child = new Brain();

        child..addLayer()
    }

    mutate(factor : number){
        for (const layer of this.layers){
            layer.mutate(factor);
        }
    }
}