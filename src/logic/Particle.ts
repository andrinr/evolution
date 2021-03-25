import type { Pt } from 'pts';

interface ParticleParams {

}

export abstract class Particle
{
    position : Pt;
    velocity : Pt;

    constructor()
    {
        
    }
    
    protected updatePosition(dt : number)
    {
        this.velocity.multiply(0.99);
        //this.velocity.add(new Pt(math.random()));
        this.position.add(this.velocity.$multiply(dt));
    }

    update(dt : number)
    {
        this.updatePosition(dt);
    }
}