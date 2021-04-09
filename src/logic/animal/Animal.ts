import type * as math from 'mathjs';
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

    constructor(params: AnimalParams) 
    {
        super(params as SwimmerParams);
        this.animalParams = params;
        this.energy = 0.5;

        this.visionLeft = new Pt(0, 0.1).rotate2D(-0.2);
        this.visionRight = new Pt(0, 0.1).rotate2D(0.2);
    }

    eat() 
    {

    }

    update(dt: number) 
    {
        this.updatePosition(dt);
        this.visionLeft = new Pt(0, this.animalParams.visionDistance).rotate2D(-0.4 + this.angle).add(this.pos);
        this.visionRight = new Pt(0, this.animalParams.visionDistance).rotate2D(0.4 + this.angle).add(this.pos);
    }

    look() 
    {
        for (const plankton of this.animalParams.nutrition.planktons) {
            const inLineLeft = Circle.intersectLine2D(Circle.fromCenter(plankton.pos, plankton.swimmerParams.radius), [this.pos, this.visionLeft]);
            const inLineRight = Circle.intersectLine2D(Circle.fromCenter(plankton.pos, plankton.swimmerParams.radius), [this.pos, this.visionRight]);
    
            let dl = 0;
            let dr = 0;

            if (inLineLeft.length > 0) {
                inLineLeft.sort((a : Pt, b : Pt) => {
                    const da = Line.magnitude([a, this.pos]);
                    const db = Line.magnitude([a, this.pos]);
                    return da - db;
                })
                dl = 1- Line.magnitude([inLineLeft[0], this.pos]) / this.animalParams.visionDistance;
                console.log(dl);
            }

            if (inLineRight.length > 0) {
                inLineRight.sort((a : Pt, b : Pt) => {
                    const da = Line.magnitude([a, this.pos]);
                    const db = Line.magnitude([a, this.pos]);
                    return da - db;
                })
                dr = 1- Line.magnitude([inLineLeft[0], this.pos]) / this.animalParams.visionDistance;
                console.log(dr);
            }
        
            const output : math.matrix = this.animalParams.brain.process([dl, dr]);
            this.angularVelocity += output[0] - 0.5;
            this.force += output[1];
        }
    }

    draw() 
    {
        const circle = Circle.fromCenter(this.pos, this.animalParams.radius);

        Animal.form.stroke("#f00").line(Group.fromArray([this.pos, this.visionLeft]));
        Animal.form.stroke("#0f0").line(Group.fromArray([this.pos, this.visionRight]));
        Animal.form.fillOnly("#fff").circle(circle);

        this.look();
    }

    breed(amount: number, mutationStregnth: number): Animal[] 
    {
        const children = [];
        for (let i = 0; i < amount; i++) {
            children.push(this.animalParams.brain.clone().mutate(mutationStregnth));
        }
        return children;
    }
}