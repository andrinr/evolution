import * as math from 'mathjs';
import { CanvasForm, CanvasSpace, Circle, Pt } from 'pts';
import type { Drawable } from '../Drawable';
import { Particle, ParticleParams } from '../Particle';
import type { Food } from "../world/Food";
import type { Brain } from "./Brain";

interface AnimalParams extends ParticleParams
{ 
    brain: Brain,
}

export class Animal extends Particle implements Drawable
{
    params: AnimalParams;
    energy : number;

    constructor(params : AnimalParams)
    {
        super(params as ParticleParams);
        this.params = params;
        this.energy = 0.5;
    }

    eat(food : Food)
    {

    }

    update(dt : number)
    {
        this.velocity.add(new Pt(math.random()-0.5, math.random()-0.5).multiply(0.01))
        this.updatePosition(dt);
    }

    draw(form : CanvasForm, space : CanvasSpace)
    {
        const circle = Circle.fromCenter(this.position.$multiply(space.size), 10);
        form.fill("#fff").circle(circle);
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