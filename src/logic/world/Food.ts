import type { Updatable } from "../AnimationInstance";
import { Particle } from '../Particle';
import * as math from 'mathjs';

export class Food extends Particle
{
    energy: number
    position: math.matrix<number>;
    velocity : math.matrix<number>;

    constructor() {
        super();
        this.position = math.random([2]);
        this.velocity = math.zeros([2]);
        this.energy = Math.random();
    }
}