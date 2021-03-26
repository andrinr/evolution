import type { CanvasForm, CanvasSpace } from "pts";
import type { Drawable } from "../Drawable";
import { Food } from "./Food";

interface EnvironmentParams 
{
    nInstances : number,
}

export class Environment implements Drawable
{
    params : EnvironmentParams;
    foods : Food[];

    constructor(params : EnvironmentParams)
    {
        this.params = params;
        this.foods = [];
        for (let i = 0; i < this.params.nInstances; i++){
            this.foods.push(new Food({
                damping : 0.99,
                randomAcceleration: 0.01,
            }));
        }
    }

    update(dt : number)
    {
        for (const food of this.foods){
            food.update(dt);
        }
    }

    draw(form : CanvasForm, space : CanvasSpace){
        for (const food of this.foods){
            food.draw(form, space);
        }
    }
}