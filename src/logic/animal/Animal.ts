import * as math from 'mathjs';

import type { AnimationInstance } from "../AnimationInstance";
import type { ObjectInstance } from '../ObjectInstance';
import type { Food } from "../world/Food";
import type { Brain } from "./Brain";

interface AnimalParams{ 
    brain: Brain,

}

export class Animal implements AnimationInstance, ObjectInstance{
    brain : Brain;
    energy : number;
    position : math.matrix<number>;

    constructor(animalParams : AnimalParams){
        this.brain = animalParams.brain;
        this.energy = 0.5;
        this.position = math.random([2]);
    }

    eat(food : Food){

    }

    update(dt : number){
        
    }

    breed(amount : number, mutationStregnth : number) : Animal[]{
        const children = [];
        for (let i = 0; i < amount; i++){
            children.push(this.brain.clone().mutate(mutationStregnth))
        }   

        return children;
    }
}