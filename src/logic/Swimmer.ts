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
    protected swimmerParams : SwimmerParams;
    public pos : Pt;
    public vel : Pt;

    static defaultParams : SwimmerParams = {
        initialVelocity : 0,
        damping : 0.99,
        randomAcceleration : 0,
        color : new Color(1,1,1),
        radius : 1
    };

    constructor(params : SwimmerParams)
    {
        this.swimmerParams = Object.assign({}, Swimmer.defaultParams, params);

        this.pos = new Pt(math.random(), math.random());
        this.vel = new Pt(math.random(), math.random());

        this.updatePosition = this.updatePosition.bind(this);
    }
    
    protected updatePosition(dt : number)
    {
        this.vel.multiply(this.swimmerParams.damping);
        this.vel.add(new Pt(math.random(), math.random()).multiply(this.swimmerParams.randomAcceleration));
        /*this.position.add(this.force.$multiply(dt));*/
        // periodic boundaries
        this.pos.add(this.vel.$multiply(dt));
        this.pos.x = this.pos.x % 1;
        this.pos.y = this.pos.y % 1;
    }

    update(dt : number)
    {
        this.updatePosition(dt);
    }
}