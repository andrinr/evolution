import * as math from 'mathjs';
import { CanvasForm, CanvasSpace, Circle, Pt } from 'pts';

import { Particle } from '../Particle';
import type { Food } from "../world/Food";
import type { Brain } from "./Brain";

interface AnimalParams{ 
    brain: Brain,
}

export class Animal extends Particle
{
    brain : Brain;
    energy : number;

    constructor(animalParams : AnimalParams){
        super();
        this.brain = animalParams.brain;
        this.energy = 0.5;
        this.position = new Pt(math.random(), math.random());
        this.velocity = new Pt(math.random(), math.random());
    }

    eat(food : Food){

    }

    update(dt : number){
        this.updatePosition(dt);
    }

    draw(form : CanvasForm, space : CanvasSpace){
        const circle = Circle.fromCenter(this.position.$multiply(space.size), 10);
        form.fill("#fff").circle(circle);
    }

    stare(){

    }

    breed(amount : number, mutationStregnth : number) : Animal[]{
        const children = [];
        for (let i = 0; i < amount; i++){
            children.push(this.brain.clone().mutate(mutationStregnth))
        }   
        return children;
    }
}