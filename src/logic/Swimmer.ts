import * as math from 'mathjs';
import {Pt, Color} from 'pts';

export interface SwimmerParams 
{
    damping?: number,
    randForce?: number,
    randAngle? : number,
    color? : Color,
    radius? : number
}

export abstract class Swimmer
{
    protected swimmerParams : SwimmerParams;
    public pos : Pt;
    public force : number;
    public angle : number;

    static defaultParams : SwimmerParams = {
        damping : 0.99,
        randAngle : 0,
        randForce: 0,
        color : new Color(1,1,1),
        radius : 1
    };

    constructor(params : SwimmerParams)
    {
        this.swimmerParams = Object.assign({}, Swimmer.defaultParams, params);

        this.pos = new Pt(math.random(), math.random());
        this.force = 0;
        this.angle = Math.PI * 2 * Math.random();

        this.updatePosition = this.updatePosition.bind(this);
    }
    
    protected updatePosition(dt : number)
    {
        this.force *= this.swimmerParams.damping;
        this.force += Math.random() * this.swimmerParams.randForce;
        this.angle += (Math.random()-0.5) * this.swimmerParams.randAngle;

        this.pos.add(new Pt(0,1).rotate2D(this.angle).multiply(this.force).multiply(dt));
        this.pos.x = this.pos.x % 1;
        this.pos.y = this.pos.y % 1;
    }

    update(dt : number)
    {
        this.updatePosition(dt);
    }
}