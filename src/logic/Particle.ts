import { Pt } from 'pts';

export interface ParticleParams {
    initialVelocity?: number,
    damping?: number,
    randomAcceleration?: number
}



export abstract class Particle
{
    params: ParticleParams;

    static defaultParams : ParticleParams = {
        initialVelocity : 0,
        damping : 0.99,
        randomAcceleration : 0
    };

    position : Pt;
    velocity : Pt;

    constructor(params : ParticleParams)
    {
        this.params = Object.assign({}, Particle.defaultParams, params);
        this.position = Pt.make(2, 1, true);
        this.velocity = Pt.make(2, 1, true).unit().multiply(this.params.initialVelocity);
    }
    
    protected updatePosition(dt : number)
    {
        this.velocity.multiply(0.999);
        //this.velocity.add(new Pt(math.random()));
        this.position.add(this.velocity.$multiply(dt));
    }

    update(dt : number)
    {
        this.updatePosition(dt);
    }
}