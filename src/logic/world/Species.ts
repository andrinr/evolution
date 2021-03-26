import { CanvasForm, CanvasSpace, Color } from "pts";
import { Animal } from "../animal/Animal";
import { Brain } from "../animal/Brain";
import { Layer } from "../animal/Layer";
import { Simulation } from "./Simulation";

export interface SpeciesParams
{
    nInstances : number, 
    survivalSteepness : number,
}

export class Species
{
    params : SpeciesParams;
    animals : Animal[];
    
    constructor(params : SpeciesParams)
    {
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
            
            this.animals.push(new Animal({ 
                brain: brain, 
                damping : 0.999, 
                color : new Color(1, 0.5 , 0),
            }));
        }
    }

    draw(form : CanvasForm, space : CanvasSpace)
    {
        for (const animal of this.animals){
            animal.draw(form, space);
        }
    }

    evolve(){
        
    }
}