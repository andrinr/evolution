import { CanvasForm, CanvasSpace, Circle, Color, Pt } from 'pts';
import type { Drawable } from './Drawable';

export interface ParticleParams 
{
    initialVelocity?: number,
    damping?: number,
    randomAcceleration?: number,
    color? : Color
}

export abstract class Particle implements Drawable
{
    params: ParticleParams;

    static defaultParams : ParticleParams = {
        initialVelocity : 0,
        damping : 0.99,
        randomAcceleration : 0,
        color : new Color(1,1,1),
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
        // periodic boundaries
        this.position.x = Math.max(0, Math.min(1, this.position.x));
        this.position.y = Math.max(0, Math.min(1, this.position.y));
    }

    update(dt : number)
    {
        this.updatePosition(dt);
    }

    draw(form : CanvasForm, space : CanvasSpace){
        const circle = Circle.fromCenter(this.position.$multiply(space.size), 5);
        form.fill(this.params.color.hex).circle(circle);
    }
}