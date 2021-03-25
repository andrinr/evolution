import * as math from 'mathjs';

export abstract class Particle
{
    position : math.matrix<number>;
    velocity : math.matrix<number>;

    constructor(){

    }
    
    protected updatePosition(dt : number)
    {
        this.position = math.add(this.position, math.multiply(this.velocity, dt));
    }

    update(dt : number){
        this.updatePosition(dt);
    }
}