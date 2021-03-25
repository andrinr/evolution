import * as math from 'mathjs';
import type { Updatable } from "../AnimationInstance";

export class Food implements Updatable
{
    energy: number
    position: math.matrix<number>;
    velocity : math.matrix<number>;

    constructor() {
        this.energy = Math.random();
        this.position = math.random([2]);
        this.velocity = math.zeros([2]);
    }

    update(dt : number) : Food {
        this.position = math.add(this.position, math.multiply(this.velocity, dt));
        return this;
    }

    draw(){
        
    }
}