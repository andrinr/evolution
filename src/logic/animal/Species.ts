import { CanvasForm, CanvasSpace, Circle } from "pts";
import { Animal } from "./Animal";
import { Brain } from "./Brain";
import { Layer } from "./Layer";

interface SpeciesParams
{
    count : number
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
                brain : brain
            })

            this.animals.push(animal);
        }

        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
    }

    update(deltaTime : number)
    {
        for (const animal of this.animals){
            animal.update(deltaTime);
        }
    }

    draw(space : CanvasSpace, form : CanvasForm)
    {
        for (const animal of this.animals){
            animal.draw(space, form);
        }
    }
}