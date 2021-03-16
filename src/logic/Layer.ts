import  {Node} from './node';

export class Layer{
    nodes : Node[];

    constructor(size: number){
        this.nodes = [];
        for (var i = 0; i < size; i++){
            this.nodes.push(new Node())
        }
    }
}