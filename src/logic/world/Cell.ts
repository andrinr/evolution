import { Pt } from "pts";
import type { Drawable } from "../Drawable";

interface TreeParams
{
    instances : Drawable[],
    minInstancesPerCell : number
}

interface CellParams
{
    left? : number, 
    right? : number, 
    boundLower? : Pt, 
    boundUpper? : Pt
}

export class Cell
{
    static treeParams : TreeParams;
    cellParams : CellParams;

    static defaultBuildParams : CellParams = 
    {
        left: 0,
        right: 0,
        boundLower : new Pt(0,0),
        boundUpper: new Pt(1,1)
    }

    static initTree(params : TreeParams)
    {
        const cell = new Cell(Cell.defaultBuildParams);
        Cell.treeParams = params;
    }

    constructor(params : CellParams)
    {
        this.cellParams = params;
    }
}