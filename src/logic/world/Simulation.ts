import { CanvasForm, CanvasSpace, Circle } from "pts";
import { Animal } from "../animal/Animal";
import { Brain } from "../animal/Brain";
import { Layer } from "../animal/Layer";
import { Food } from "./Food";

interface SimulationParams 
{
    foodCount : number,
    animalCount : number,
    survivalSteepness : number,
    timePerEpoch : number,
    deltaTime : number,
    space : CanvasSpace,
    form : CanvasForm, 
    evolutionSpeedup : number,
}

export class Simulation
{
    params : SimulationParams;
    foods : Food[];
    animals : Animal[];
    simualtionTime : number;
    epoch : number;

    constructor(params : SimulationParams)
    {
        this.params = params;
        this.foods = [];
        this.animals = [];

        for (let i = 0; i < this.params.foodCount; i++){
            const food = new Food({
                damping : 0.99,
                initialVelocity: 0.1,
                randomAcceleration: 0.01,
            });

            this.foods.push(food);
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
        }

        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);

        this.params.space.add(this.update);

        this.simualtionTime = 0;
        this.epoch = 0;

        this.params.space.play();
    }


    update()
    {
        this.draw();
        for (let i = 0; i < this.params.evolutionSpeedup; i++){
            this.simualtionTime += this.params.deltaTime;

            for (const animal of this.animals){
                animal.update(this.params.deltaTime);
            }
    
            for (const food of this.foods){
                food.update(this.params.deltaTime);
            }

            if (this.simualtionTime > this.params.timePerEpoch){
                this.epoch++;
                this.simualtionTime = 0;
                this.evolve();
            }
        }
    }

    evolve()
    {
        console.log("New epoch reached");
    }   


    draw()
    {
        for (const animal of this.animals){
            const circle = Circle.fromCenter(animal.pos.$multiply(this.params.space.size), 5);
            this.params.form.fill("#fff").circle(circle);
        }

        for (const food of this.foods){
            const circle = Circle.fromCenter(food.pos.$multiply(this.params.space.size), 5);
            this.params.form.fill("#fff").circle(circle);
        }
    }
}