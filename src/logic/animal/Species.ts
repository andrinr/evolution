import type { Nutrition } from "../world/Nutrition";
import { Animal } from "./Animal";
import { Brain } from "./Brain";
import { Layer } from "./Layer";

interface SpeciesParams
{
    count : number,
    nutrition : Nutrition,
}

export class Species
{
    params : SpeciesParams;
    animals : Animal[];

    constructor(params : SpeciesParams)
    {
        this.params = params;
        this.animals = [];
        for (let i = 0; i < this.params.count; i++){
            const brain = new Brain({
                layers: [
                    new Layer({ breadth: 5 }),
                    new Layer({ breadth: 5 }),
                    new Layer({ breadth: 3 }),
                ],
            });
            
            const animal = new Animal({
                brain : brain,
                friction : 0.4,
                randForce: 100,
                randAngularForce : 30,
                visionDistance : 50
            });

            this.animals.push(animal);
        }
    }
}