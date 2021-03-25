import type { CanvasForm, CanvasSpace } from "pts";
import { Animal } from "../animal/Animal";
import { Brain } from "../animal/Brain";
import { Layer } from "../animal/Layer";
import { Environment } from "./Environment";
import type { EvolutionRenderer } from "./EvolutionRenderer";

export interface EvolutionParams
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
    renderer : EvolutionRenderer;
    epoch : number;
    simualtionTime : number;
    
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

        this.environment = new Environment({nInstances : 100});
        this.epoch = 0;
    }

    attachRenderer(renderer : EvolutionRenderer){
        this.renderer = renderer;
    }

    update(speedup? : number){
        const step = this.params.timePerEpoch / this.params.deltaTime;
        if (!speedup) speedup = 1;
        console.log("Updating evolution");

        for (let i = 0; i < speedup; i++){
            console.log(i);
            this.environment.update(this.params.deltaTime);
            for (const animal of this.animals){
                animal.update(this.params.deltaTime);
            }
            // Call independant renderer in each time step
            if (this.renderer) this.renderer.render();
            this.simualtionTime += step;

            if (this.simualtionTime > this.params.timePerEpoch){
                this.epoch++;
                this.simualtionTime = 0;
                this.evolve();
            }
        }
    }

    draw(form : CanvasForm, space : CanvasSpace){
        for (const animal of this.animals){
            animal.draw(form, space);
        }
    }

    evolve(){
        console.log("New epoch reached");
    }
}