import { CanvasForm, CanvasSpace, Color } from "pts";
import { Animal } from "../animal/Animal";
import { Brain } from "../animal/Brain";
import { Layer } from "../animal/Layer";
import { Environment } from "./Environment";

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
    epoch : number;
    simualtionTime : number;
    
    constructor(params : EvolutionParams)
    {
        this.params = params;

        this.animals = [];

        console.log(new Color(1, 0.5 , 0).hex);
        
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
                initialVelocity : 0.2, 
                damping : 0.999, 
                randomAcceleration : 0.1,
                color : new Color(1, 0.5 , 0),
            }));
        }

        this.environment = new Environment({nInstances : 100});
        this.epoch = 0;
    }

    update(speedup : number = 1)
    {
        const step = this.params.timePerEpoch / this.params.deltaTime;

        for (let i = 0; i < speedup; i++){
            this.environment.update(this.params.deltaTime);
            for (const animal of this.animals){
                animal.update(this.params.deltaTime);
            }
            this.simualtionTime += step;

            if (this.simualtionTime > this.params.timePerEpoch){
                this.epoch++;
                this.simualtionTime = 0;
                this.evolve();
            }
        }
    }

    draw(form : CanvasForm, space : CanvasSpace)
    {
        for (const animal of this.animals){
            animal.draw(form, space);
        }

        this.environment.draw(form, space);
    }

    evolve()
    {
        console.log("New epoch reached");
    }
}