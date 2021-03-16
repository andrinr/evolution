export class Neuron{
    edges : Edge[];
    value : number;

    constructor(){

    }

    propagate(){
        this.value = 0;
        for (let edge of this.edges){
            this.value += edge.neuron.value * edge.weight;
        }
    }

    mutate(factor : number){
        for (let edge of this.edges){
            edge.weight += Math.random() * factor;
        }
    }
}

interface Edge{
    neuron : Neuron,
    weight : number
}