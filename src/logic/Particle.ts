import * as math from 'mathjs';
import {Pt, Color} from 'pts';

export interface SwimmerParams 
{
    initialVelocity?: number,
    damping?: number,
    randomAcceleration?: number,
    color? : Color,
    radius? : number
}

export abstract class Swimmer
{
    params : SwimmerParams;
    pos : Pt;
    vel : Pt;

    static defaultParams : SwimmerParams = {
        initialVelocity : 0,
        damping : 0.99,
        randomAcceleration : 0,
        color : new Color(1,1,1),
        radius : 1
    };

    constructor(params : SwimmerParams)
    {
        this.params = Object.assign({}, Swimmer.defaultParams, params);
        this.pos = new Pt(math.random(), math.random());
        this.vel = new Pt(math.random(), math.random());
    }
    
    protected updatePosition(dt : number)
    {
        this.vel.multiply(this.params.damping);
        this.vel.add(new Pt(math.random(), math.random()).multiply(this.params.randomAcceleration));
        /*this.position.add(this.force.$multiply(dt));*/
        // periodic boundaries
        this.pos.x = Math.max(0, Math.min(1, this.pos.x));
        this.pos.y = Math.max(0, Math.min(1, this.pos.y));
    }

    update(dt : number)
    {
        
        
    }
}