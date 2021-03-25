import { Particle } from '../Particle';
import * as math from 'mathjs';
import { Pt } from 'pts';

export class Food extends Particle
{
    energy: number
    position: math.matrix<number>;
    velocity : math.matrix<number>;

    constructor()
    {
        super();
        this.position = new Pt(math.random(), math.random());
        this.velocity = new Pt(math.random(), math.random());
        this.energy = Math.random();
    }
}