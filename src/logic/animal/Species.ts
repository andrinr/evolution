import { MultiTouchSpace } from "pts";
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
                    new Layer({ breadth: 2, activationFunction : Layer.relu }),
                    new Layer({ breadth: 2, activationFunction : Layer.relu }),
                    new Layer({ breadth: 2, activationFunction : Layer.relu }),
                ],
            });
            
            const animal = new Animal({
                brain : brain,
                friction : 0.4,
                randForce: 0,
                randAngularForce : 0,
                visionDistance : 150,
                nutrition : this.params.nutrition,
                intertia : 0.9
            });

            this.animals.push(animal);
        }
    }

    evolve()
    {
        this.animals.sort( (a : Animal, b : Animal) => {
            return a.score - b.score;
        });

        const nextGen = [];
        for (let i = 0; i < this.animals.length/2; i++){
            nextGen.concat(this.animals[i].breed(2, 0.1), nextGen);
        }

        for (const animal of this.animals){
            animal.kill();
        }

        this.animals = nextGen;
    }
}