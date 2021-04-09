import { Circle, Group } from 'pts';
import { Swimmer, SwimmerParams } from '../Swimmer';

interface PlanktonParams extends SwimmerParams
{

}

export class Plankton extends Swimmer
{
    energy: number
    shape : Group

    constructor(params : PlanktonParams)
    {
        super(params as SwimmerParams);
        this.energy = Math.random();
    }

    draw(){
        const circle = Circle.fromCenter(this.pos, this.swimmerParams.radius);
        Plankton.form.fillOnly("#fff").circle(circle);
    }
}