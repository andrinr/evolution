import * as math from 'mathjs';
import { CanvasForm, CanvasSpace, Circle, Group, Line, Pt } from 'pts';
import { Swimmer, SwimmerParams } from '../Swimmer';
import type { Nutrition } from '../world/Nutrition';
import type { Plankton } from "../world/Plankton";
import type { Brain } from "./Brain";

interface AnimalParams extends SwimmerParams {
    brain: Brain,
    visionDistance: number,
    nutrition: Nutrition
}

export class Animal extends Swimmer {
    animalParams: AnimalParams;
    energy: number;
    angle: number;
    visionLeft: Pt;
    visionRight: Pt;

    constructor(params: AnimalParams) {
        super(params as SwimmerParams);
        this.animalParams = params;
        this.energy = 0.5;

        this.visionLeft = new Pt(0, 0.1).rotate2D(-0.2);
        this.visionRight = new Pt(0, 0.1).rotate2D(0.2);
    }

    eat(food: Plankton) {

    }

    update(dt: number) {
        this.updatePosition(dt);
        this.visionLeft = new Pt(0, this.animalParams.visionDistance).rotate2D(-0.4 + this.angle).add(this.pos);
        this.visionRight = new Pt(0, this.animalParams.visionDistance).rotate2D(0.4 + this.angle).add(this.pos);
    }

    look() {
        for (const plankton of this.animalParams.nutrition.planktons) {
            console.log([plankton.pos, this.pos]);
            if (Line.magnitudeSq([plankton.pos, this.pos]) < this.animalParams.visionDistance){
                const inLineLeft = Circle.intersectLine2D(Circle.fromCenter(plankton.pos, 10), [this.pos, this.visionLeft]);
                const inLineRight = Circle.intersectLine2D(Circle.fromCenter(plankton.pos, 10), [this.pos, this.visionRight]);
       
                if (inLineLeft.length > 0) {
                    Animal.form.fillOnly("#f03").points( inLineLeft, 3, "circle" );
                }
    
                if (inLineRight.length > 0) {
                    Animal.form.fillOnly("#0f3").points( inLineRight, 3, "circle" );
                }
            }
        }
    }

    draw() {
        const circle = Circle.fromCenter(this.pos, this.animalParams.radius);

        Animal.form.stroke("#f00").line(Group.fromArray([this.pos, this.visionLeft]));
        Animal.form.stroke("#0f0").line(Group.fromArray([this.pos, this.visionRight]));
        Animal.form.fillOnly("#444").circle(circle);

        this.look();
    }

    breed(amount: number, mutationStregnth: number): Animal[] {
        const children = [];
        for (let i = 0; i < amount; i++) {
            children.push(this.animalParams.brain.clone().mutate(mutationStregnth));
        }
        return children;
    }
}