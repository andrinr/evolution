import * as math from 'mathjs';
import {Pt, Color} from 'pts';
import { Drawable } from './Drawable';

export interface SwimmerParams 
{
    friction?: number,
    intertia? : number,
    randForce?: number,
    randAngularForce? : number,
    color? : Color,
    radius? : number
}

export abstract class Swimmer extends Drawable
{
    protected swimmerParams : SwimmerParams;
    public pos : Pt;
    public force : number;
    public angle : number;
    public angularVelocity : number;

    static defaultParams : SwimmerParams = {
        friction : 0.1,
        intertia : 0.8,
        randAngularForce : 0,
        randForce: 0,
        color : new Color(1,1,1),
        radius : 1
    };

    constructor(params : SwimmerParams)
    {
        super();
        this.swimmerParams = Object.assign({}, Swimmer.defaultParams, params);

        this.pos = new Pt(math.random(), math.random());
        this.force = 0;
        this.angularVelocity = 0;
        this.angle = Math.PI * 2 * Math.random();

        this.updatePosition = this.updatePosition.bind(this);
    }
    
    protected updatePosition(dt : number)
    {
        this.force *= ( 1 - dt * this.swimmerParams.friction );
        this.force += dt * Math.random() * this.swimmerParams.randForce;
        this.angularVelocity *= ( 1 - dt * this.swimmerParams.intertia );
        this.angularVelocity += dt * (Math.random()-0.5) * this.swimmerParams.randAngularForce;
        this.angle += dt * this.angularVelocity;

        this.pos.add(new Pt(0,1).rotate2D(this.angle).multiply(this.force).multiply(dt));
        this.pos.x = this.pos.x % 1;
        this.pos.y = this.pos.y % 1;
    }


    update(dt : number)
    {
        this.updatePosition(dt);
    }
}