import type { AnimationInstance } from "../AnimationInstance";
import type { Brain } from "./Brain";

interface AnimalParams{ 
    brain: Brain,

}

export class Animal implements AnimationInstance{
    brain : Brain;

    constructor(animalParams : AnimalParams){
        this.brain = animalParams.brain;
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