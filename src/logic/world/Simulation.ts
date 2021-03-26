import { CanvasForm, CanvasSpace, Particle, World } from "pts";
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
    world : World;
    simualtionTime : number;
    epoch : number;

    constructor(params : SimulationParams)
    {
        this.params = params;
        this.foods = [];
        this.animals = [];
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

        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);

        this.params.space.add(this.update);

        this.simualtionTime = 0;
        this.epoch = 0;

        this.params.space.play();
    }


    update()
    {
        console.log("update");
        this.draw();
        for (let i = 0; i < this.params.evolutionSpeedup; i++){
            this.world.update(this.params.deltaTime)
            this.simualtionTime += this.params.deltaTime;
            if (this.simualtionTime > this.params.timePerEpoch){
                this.epoch++;
                this.simualtionTime = 0;
                this.evolve();
            }
        }
    }

    evolve(){
        console.log("New epoch reached");
    }   


    draw(){
        this.world.drawParticles((p: Particle, i : number) =>{
            let color = (i===0) ? "#fff" : ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"][i%4];
            this.params.form.fillOnly( color ).point( p.$multiply(this.params.space.size), p.radius, "circle" ) 
        });
    }
}