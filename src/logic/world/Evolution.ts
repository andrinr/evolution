import { Animal } from "../animal/Animal";
import { Brain } from "../animal/Brain";
import { Layer } from "../animal/Layer";
import { Environment } from "./Environment";

interface EvolutionParams
{ 
    nInstances : number, 
    survivalSteepness : number,
    timePerEpoch : number,
    deltaTime : number
}

export class Evolution
{
    params : EvolutionParams;
    animals : Animal[];
    environment : Environment;
    
    constructor(params : EvolutionParams){
        this.params = params;

        this.animals = [];
        
        for (let i = 0; i < params.nInstances; ++i){
            const brain = new Brain({
                layers: [
                    new Layer({ breadth: 5 }),
                    new Layer({ breadth: 5 }),
                    new Layer({ breadth: 3 }),
                ],
            });
        
            this.animals.push(new Animal({ brain: brain }));
        }

        this.environment = new Environment();
    }

    epoch(){
        const step = this.params.timePerEpoch / this.params.deltaTime;

        for (let i = 0; i < this.params.timePerEpoch; i += step){
            this.environment.update(this.params.deltaTime);
            for (const animal of this.animals){
                animal.update(this.params.deltaTime);
            }
        }
    }

    evolve(nEpochs : number){
        for (let i = 0; i < nEpochs; i++){
            this.epoch();
        }
    }
}