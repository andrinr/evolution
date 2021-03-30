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

    draw(space : CanvasSpace, form : CanvasForm){
        const circle = Circle.fromCenter(this.pos.$multiply(space.size), 5);
        form.fillOnly("#fff").circle(circle);
    }
}