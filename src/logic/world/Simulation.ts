import type { CanvasForm, CanvasSpace } from "pts";
import { Species } from "../animal/Species";
import { Nutrition } from "./Nutrition";

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
    nutrition : Nutrition;
    species : Species;
    simualtionTime : number;
    epoch : number;

    constructor(params : SimulationParams)
    {
        this.params = params;

        this.species = new Species({count : params.animalCount});
        this.nutrition = new Nutrition({count : params.foodCount});

        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.animationLoop = this.animationLoop.bind(this);

        this.simualtionTime = 0;
        this.epoch = 0;

        //this.animationLoop();
    }

    animationLoop(){
        this.update();
        window.requestAnimationFrame(this.animationLoop);
    }

    update()
    {
        this.draw();
        for (let i = 0; i < this.params.evolutionSpeedup; i++){
            this.simualtionTime += this.params.deltaTime;

            this.species.update(this.params.deltaTime);
            this.nutrition.update(this.params.deltaTime);

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
        this.species.draw(this.params.space, this.params.form);
        this.nutrition.draw(this.params.space, this.params.form);
    }
}