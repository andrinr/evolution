import type { Brain } from "./Brain";

interface HerbivoreParams{ 
    brain: Brain,

}

export class Herbivore{
    brain : Brain;

    constructor(animalParams : HerbivoreParams){
        this.brain = animalParams.brain;
    }

    update(){
        
    }

    breed(amount : number, variance : number){

    }
}