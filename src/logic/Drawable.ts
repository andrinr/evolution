import type { CanvasForm, CanvasSpace } from "pts";

export class Drawable
{
    static instances : Drawable[] = [];
    static space : CanvasSpace;
    static form : CanvasForm;

    constructor()
    {
        Drawable.instances.push(this);
    }

    static setSpaceForm(space : CanvasSpace, form : CanvasForm)
    {
        this.space = space;
        this.form = form;
    }

    static initAll()
    {
        for (const instance of Drawable.instances){
            instance.init();
        }
    }

    static drawAll()
    {
        for (const instance of Drawable.instances){
            instance.draw();
        }
    }

    static updateAll(dt : number)
    {
        for (const instance of Drawable.instances){
            instance.update(dt);
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
}