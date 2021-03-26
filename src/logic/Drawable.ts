import type { CanvasForm, CanvasSpace } from "pts";

export interface Drawable {
    draw(form : CanvasForm, space : CanvasSpace)
}
