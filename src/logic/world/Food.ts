import { Particle, ParticleParams } from '../Particle';
import type { CanvasForm, CanvasSpace, Pt } from 'pts';
import type { Drawable } from '../Drawable';

interface FoodParams extends ParticleParams
{

}

export class Food extends Particle implements Drawable
{
    energy: number

    constructor(params : FoodParams)
    {
        super(params as ParticleParams);
        this.energy = Math.random();
    }

    draw(form : CanvasForm, space : CanvasSpace){
        
    }
}