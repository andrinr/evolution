import type { CanvasForm, CanvasSpace } from "pts";
import { Plankton } from "./Plankton";

interface NutritionParams
{
    count : number
}

export class Nutrition
{
    params : NutritionParams;
    planktons : Plankton[];

    constructor(params : NutritionParams)
    {
        this.params = params;
        this.planktons = [];
        for (let i = 0; i < this.params.count; i++){
            const plankton = new Plankton({
                friction : 0.1,
                randAngularForce : 50,
                randForce : 0.01,
            });

            this.planktons.push(plankton);
        }

        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
    }

    update(deltaTime : number)
    {
        for (const plankton of this.planktons){
            plankton.update(deltaTime);
        }
    }

    draw(space : CanvasSpace, form : CanvasForm)
    {
        for (const plankton of this.planktons){
            plankton.draw(space, form);
        }
    }
}