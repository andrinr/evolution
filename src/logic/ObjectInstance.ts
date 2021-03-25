import * as math from 'mathjs';

export abstract class Particle
{
    position : math.matrix<number>;
    velocity : math.matrix<number>;
    
    protected updatePosition(dt : number)
    {
        console.log(dt);
        this.position = math.add(this.position, math.multiply(this.velocity, dt));
    }
}