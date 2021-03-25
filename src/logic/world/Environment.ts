import type { Updatable } from "../AnimationInstance";
import { Food } from "./Food";

interface EnvironmentParams {
    nInstances : number,
}

export class Environment implements Updatable
{
    params : EnvironmentParams;
    foods : Food[];

    constructor(params : EnvironmentParams){
        this.params = params;
        this.foods = [];
        for (let i = 0; i < this.params.nInstances; i++){
            this.foods.push(new Food());
        }
    }

    update(dt : number){
        for (const food of this.foods){
            food.update(dt);
        }
    }
}