import * as math from 'mathjs';
import { Pt } from 'pts';
import { Swimmer, SwimmerParams } from '../Particle';
import type { Food } from "../world/Food";
import type { Brain } from "./Brain";

interface AnimalParams extends SwimmerParams
{ 
    brain: Brain,
}

export class Animal extends Swimmer
{
    params: AnimalParams;
    energy : number;

    constructor(params : AnimalParams)
    {
        super(params as SwimmerParams);
        this.params = params;
        this.energy = 0.5;
    }

    eat(food : Food)
    {

    }

    update(dt : number)
    {
        this.hit(new Pt(math.random()-0.5, math.random()-0.5).multiply(0.01))
        this.updatePosition(dt);
    }

    stare()
    {

    }

    breed(amount : number, mutationStregnth : number) : Animal[]
    {
        const children = [];
        for (let i = 0; i < amount; i++){
            children.push(this.params.brain.clone().mutate(mutationStregnth));
        }   
        return children;
    }
}