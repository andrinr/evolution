import { Particle, ParticleParams } from '../Particle';
import type { CanvasForm, CanvasSpace, Pt } from 'pts';
import type { Drawable } from '../Drawable';

interface FoodParams extends ParticleParams
{

}

export class Food extends Particle
{
    energy: number

    constructor(params : FoodParams)
    {
        super(params as ParticleParams);
        this.energy = Math.random();
    }
}