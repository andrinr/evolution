import  {Neuron} from './node';

interface Layer {
    nodes : Neuron[];
    propagate(): void;
}

export class LinearLayer implements Layer {
    nodes : Neuron[];

    constructor(size: number){
        this.nodes = [];
        for (var i = 0; i < size; i++){
            this.nodes.push(new Neuron());
        }
    }

    propagate(){
        for (let node of this.nodes){
            node.propagate();
        }
    }

    mutate(factor : number){
        for (let node of this.nodes){
            node.mutate(factor);
        }
    }

    copy(){
        
    }
}