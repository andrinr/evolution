<script lang="ts">
    import { onMount } from "svelte";
    import {CanvasSpace, Circle, CanvasForm} from "pts"
    import { Simulation } from "./logic/world/Simulation";

    let space : CanvasSpace = null;
    let form : CanvasForm = null;

    onMount( async () => {
        space = new CanvasSpace("#canvas");
        space.setup({ bgcolor: "#123" });
        form = space.getForm();

        const evolution = new Simulation({
            animalCount: 100,
            foodCount: 200,
            survivalSteepness: 2,
            evolutionSpeedup : 1,
            timePerEpoch: 4,
            deltaTime: 0.02,
            space : space,
            form : form,
        });
    });
</script>

<canvas id="canvas"/>

<style>
    :global(#canvas){
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
</style>
