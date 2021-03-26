<script lang="ts">
    import { Evolution } from "./logic/world/Evolution";
    import { onMount } from "svelte";

    import {CanvasSpace, Circle, CanvasForm} from "pts"

    const evolution = new Evolution({
        nInstances: 100,
        survivalSteepness: 2,
        timePerEpoch: 4,
        deltaTime: 0.02,
    });

    let space : CanvasSpace = null;
    let form : CanvasForm = null;

    onMount( async () => {
        space = new CanvasSpace("#canvas");
        space.setup({ bgcolor: "#123" });
        form = space.getForm();

        space.add( time => {
            evolution.update();
            evolution.draw(form, space);
        });

        space.play();
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
