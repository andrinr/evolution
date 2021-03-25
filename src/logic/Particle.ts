import * as math from 'mathjs';
import type { Pt } from 'pts';

export abstract class Particle
{
    position : Pt;
    velocity : Pt;

    constructor(){
        
    }
    
    protected updatePosition(dt : number)
    {
        this.position.add(this.velocity.$multiply(dt));
    }

    update(dt : number){
        this.updatePosition(dt);
    }
}