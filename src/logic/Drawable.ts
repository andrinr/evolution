import type { CanvasForm, CanvasSpace } from "pts";

export class Drawable
{
    static instances : Map<number, Drawable> = new Map<number, Drawable>();
    static count : number = 0;
    static space : CanvasSpace;
    static form : CanvasForm;

    id : number;
    firstFrame : boolean;

    constructor()
    {
        this.id = Drawable.count++;
        Drawable.instances.set(this.id, this);
        this.firstFrame = true;
    }

    static setSpaceForm(space : CanvasSpace, form : CanvasForm)
    {
        this.space = space;
        this.form = form;
    }

    static initAll()
    {
        for (const [key, value] of Drawable.instances){
            value.init();
        }
    }

    static drawAll()
    {
        for (const [key, value] of Drawable.instances){
            value.draw();
        }
    }

    static updateAll(dt : number)
    {
        for (const [key, value] of Drawable.instances){
            if (value.firstFrame){
                value.init();
                value.firstFrame = false;
            }
            value.update(dt);
        }
    }
    
    draw()
    {
   
    }

    update(dt : number)
    {

    }

    init()
    {

    }

    kill()
    {
        Drawable.instances.delete(this.id);
    }
}