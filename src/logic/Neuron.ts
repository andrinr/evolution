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

    connect(neuron : Neuron, weight : number){
        this.edges.push({neuron: neuron, weight: weight})
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