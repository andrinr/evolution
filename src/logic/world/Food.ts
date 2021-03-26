import { Particle, ParticleParams } from '../Particle';

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