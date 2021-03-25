import type { Evolution } from "./Evolution";

interface RendererParams 
{
    canvasId : string,
    evolution : Evolution,
}

export class EvolutionRenderer
{
    params : RendererParams;
    context : CanvasRenderingContext2D;

    constructor(params: RendererParams){
        this.params = params;
        this.params.evolution.attachRenderer(this);

        const canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(params.canvasId);
        this.context = canvas.getContext("2d");
    }

    render(){
        for (const food of this.params.evolution.environment.foods){
            this.context.fillRect(food.position[0], food.position[1], 10, 10);
        }
    }
}