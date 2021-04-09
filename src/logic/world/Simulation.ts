import type { CanvasForm, CanvasSpace } from "pts";
import { Species } from "../animal/Species";
import { Drawable } from "../Drawable";
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
    firstFrame : boolean;

    constructor(params : SimulationParams)
    {
        this.params = params;
        this.nutrition = new Nutrition({count : params.foodCount});
        this.species = new Species({count : params.animalCount, nutrition : this.nutrition});

        this.update = this.update.bind(this);

        this.simualtionTime = 0;
        this.epoch = 0;
        this.firstFrame = true;
    }

    init()
    {
        Drawable.initAll();
    }

    update()
    {
        if (this.firstFrame){
            this.init();
            this.firstFrame = false;
        }
        
        Drawable.drawAll();
        for (let i = 0; i < this.params.evolutionSpeedup; i++){
            this.simualtionTime += this.params.deltaTime;

            Drawable.updateAll(this.params.deltaTime);

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
}