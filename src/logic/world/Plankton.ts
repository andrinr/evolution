import { CanvasForm, CanvasSpace, Circle } from 'pts';
import { Swimmer, SwimmerParams } from '../Swimmer';

interface PlanktonParams extends SwimmerParams
{

}

export class Plankton extends Swimmer
{
    energy: number

    constructor(params : PlanktonParams)
    {
        super(params as SwimmerParams);
        this.energy = Math.random();
    }

    draw(){
        const circle = Circle.fromCenter(this.pos.$multiply(Plankton.space.size), 5);
        Plankton.form.fillOnly("#fff").circle(circle);
    }
}