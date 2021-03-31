import * as math from 'mathjs';
import { CanvasForm, CanvasSpace, Circle, Group, Pt } from 'pts';
import { Swimmer, SwimmerParams } from '../Swimmer';
import type { Plankton } from "../world/Plankton";
import type { Brain } from "./Brain";

interface AnimalParams extends SwimmerParams
{ 
    brain: Brain,
    visionDistance : number,
}

export class Animal extends Swimmer
{
    animalParams: AnimalParams;
    energy : number;
    angle : number;
    visionLeft : Pt;
    visionRight : Pt;

    constructor(params : AnimalParams)
    {
        super(params as SwimmerParams);
        this.animalParams = params;
        this.energy = 0.5;


        this.visionLeft = new Pt(0,0.1).rotate2D(-0.2);
        this.visionRight = new Pt(0,0.1).rotate2D(0.2);
    }

    eat(food : Plankton)
    {

    }

    update(dt : number)
    {
        //this.vel.add(new Pt(math.random()-0.5, math.random()-0.5).multiply(0.01))
        this.updatePosition(dt);
    }

    stare()
    {

    }

    draw()
    {
        const circle = Circle.fromCenter(this.pos.$multiply(Animal.space.size), 10);

        this.visionLeft = new Pt(0,this.animalParams.visionDistance).rotate2D(-0.4 + this.angle).add(this.pos);
        this.visionRight = new Pt(0,this.animalParams.visionDistance).rotate2D(0.4 + this.angle).add(this.pos);
        
        Animal.form.stroke("#0f0").line(Group.fromArray([this.pos.$multiply(Animal.space.size), this.visionLeft.multiply(Animal.space.size)]));
        Animal.form.stroke("#00f").line(Group.fromArray([this.pos.$multiply(Animal.space.size), this.visionRight.multiply(Animal.space.size)]));
        Animal.form.fillOnly("#f00").circle(circle);
    }

    breed(amount : number, mutationStregnth : number) : Animal[]
    {
        const children = [];
        for (let i = 0; i < amount; i++){
            children.push(this.animalParams.brain.clone().mutate(mutationStregnth));
        }   
        return children;
    }
}