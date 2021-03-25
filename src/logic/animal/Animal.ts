import * as math from 'mathjs';

import type { Updatable } from "../AnimationInstance";
import { Particle } from '../ObjectInstance';
import type { Food } from "../world/Food";
import type { Brain } from "./Brain";

interface AnimalParams{ 
    brain: Brain,

}

export class Animal extends Particle implements Updatable
{
    brain : Brain;
    energy : number;
    position : math.matrix<number>;
    velocity : math.matrix<number>;

    constructor(animalParams : AnimalParams){
        super();
        this.brain = animalParams.brain;
        this.energy = 0.5;
        this.position = math.random([2]);
    }

    eat(food : Food){

    }

    update(dt : number){
        this.updatePosition(dt);
    }

    breed(amount : number, mutationStregnth : number) : Animal[]{
        const children = [];
        for (let i = 0; i < amount; i++){
            children.push(this.brain.clone().mutate(mutationStregnth))
        }   
        return children;
    }
}