import { CanvasForm, CanvasSpace, World } from "pts";
import { Animal } from "../animal/Animal";
import { Brain } from "../animal/Brain";
import { Layer } from "../animal/Layer";
import type { Drawable } from "../Drawable";
import { Food } from "./Food";
import type { Species } from "./Species";

interface SimulationParams 
{
    foodCount : number,
    animalCount : number,
    timePerEpoch : number,
    deltaTime : number,
    space : CanvasSpace,
    form : CanvasForm
}

export class Simulation implements Drawable
{
    params : SimulationParams;
    foods : Food[];
    animals : Animal[];
    world : World;
    species : Species[];
    simualtionTime : number;
    epoch : number;

    constructor(params : SimulationParams)
    {
        this.params = params;
        this.foods = [];
        this.world = new World(this.params.space.innerBound, 1, 0);

        for (let i = 0; i < this.params.foodCount; i++){
            const food = new Food({
                damping : 0.99,
                randomAcceleration: 0.01,
            });

            this.foods.push(food);
            this.world.add(food);
        }

        for (let i = 0; i < this.params.animalCount; i++){
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
            this.world.add(animal);
        }
        this.simualtionTime = 0;
        this.epoch = 0;
    }

    update(speedup : number = 1)
    {
        for (let i = 0; i < speedup; i++){
            for (const species of this.species){
                species.update();
            }
            
            for (const animal of this.foods){
                animal.update(this.params.deltaTime);
            }

            this.simualtionTime += this.params.deltaTime;
            if (this.simualtionTime > this.params.timePerEpoch){
                this.epoch++;
                this.simualtionTime = 0;
                for (const species of this.species){
                    species.evolve();
                }
            }
        }
    }


    draw(form : CanvasForm, space : CanvasSpace){
        for (const food of this.foods){
            food.draw(form, space);
        }

        for (const species of this.species){
            species.draw(form, space);
        }
    }
}