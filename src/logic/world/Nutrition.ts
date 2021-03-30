import { CanvasForm, CanvasSpace, Circle } from "pts";
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
                damping : 0.99,
                initialVelocity: 0.1,
                randomAcceleration: 0.001,
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