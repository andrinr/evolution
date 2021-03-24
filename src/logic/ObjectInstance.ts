import * as math from 'mathjs';

export abstract class ObjectInstance
{
    position : math.matrix<number>;
    velocity : math.matrix<number>;

    
    protected updatePosition(dt : number)
    {
        this.position = math.add(this.position, math.multiply(this.velocity, dt));
    }

}