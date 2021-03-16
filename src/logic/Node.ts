export class Node{
    edges : Edge[];
    value : number;

    constructor(){

    }

    propagate(){
        this.value = 0;
        for (let i = 0; i < this.edges.length; i++){
            this.value += this.edges[i].node.value * this.edges[i].weight;
        }
    }
}

interface Edge{
    node : Node,
    weight : number
}