import {Layer} from './layer';

export class Network{
    layers : Layer[];

    constructor(){
        this.layers = [];
    }

    addLayer(layer : Layer){
        this.layers.push(layer);
        let l = this.layers.length;
        if (l > 1){
            this.connect(this.layers[l-1], this.layers[l-2]);
        }
    }

    connect(layerA : Layer, layerB : Layer){
        // connect and initialize with random weights
        for (const nodeA of layerA.nodes){
            for (const nodeB of layerB.nodes){
                nodeA.edges.push({node : nodeB, weight : Math.random()})
            }
        }
    }
}