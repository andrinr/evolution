import { CanvasForm, CanvasSpace, Circle, Color, Num, Particle, Pt } from 'pts';
import type { Drawable } from './Drawable';

export interface SwimmerParams 
{
    initialVelocity?: number,
    damping?: number,
    randomAcceleration?: number,
    color? : Color
}

export abstract class Swimmer extends Particle
{
    params: SwimmerParams;

    static defaultParams : SwimmerParams = {
        initialVelocity : 0,
        damping : 0.99,
        randomAcceleration : 0,
        color : new Color(1,1,1),
    };

    constructor(params : SwimmerParams)
    {
        super(Pt.make(2, 1, true));
        this.params = Object.assign({}, Swimmer.defaultParams, params);

        this.hit( new Pt(Num.randomRange(-1,1), Num.randomRange(-1, 1)).unit().multiply(this.params.randomAcceleration) );
    }
    
    protected updatePosition(dt : number)
    {
        this.force.multiply(0.999);
        //this.velocity.add(new Pt(math.random()));
        this.position.add(this.force.$multiply(dt));
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