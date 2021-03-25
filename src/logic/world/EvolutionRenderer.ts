import type { Evolution } from "./Evolution";
import * as math from 'mathjs';

interface RendererParams 
{
    canvasId: string,
    evolution: Evolution,
}

export class EvolutionRenderer 
{
    params: RendererParams;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(params: RendererParams)
    {
        this.params = params;
        this.params.evolution.attachRenderer(this);

        this.canvas = <HTMLCanvasElement>document.getElementById(params.canvasId);
        this.context = this.canvas.getContext("2d");
    }

    render() 
    {
        for (const food of this.params.evolution.environment.foods) {
            this.context.fillRect(
                math.subset(food.position, math.index(0)) * this.canvas.width,
                math.subset(food.position, math.index(1)) * this.canvas.height,
                10, 10
            );
        }

        for (const animal of this.params.evolution.animals) {
            this.context.fillRect(
                math.subset(animal.position, math.index(0)) * this.canvas.width,
                math.subset(animal.position, math.index(1)) * this.canvas.height,
                10, 10
            );
        }
    }
}