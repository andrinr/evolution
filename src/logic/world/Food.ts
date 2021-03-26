import { Swimmer, SwimmerParams } from '../Particle';

interface FoodParams extends SwimmerParams
{

}

export class Food extends Swimmer
{
    energy: number

    constructor(params : FoodParams)
    {
        super(params as SwimmerParams);
        this.energy = Math.random();
    }
}