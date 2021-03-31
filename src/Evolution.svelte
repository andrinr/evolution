<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { CanvasSpace, CanvasForm } from "pts";
    import { Simulation } from "./logic/world/Simulation";
import { Drawable } from "./logic/Drawable";

    let space: CanvasSpace = null;
    let form: CanvasForm = null;

    onMount(async () => {
        space = new CanvasSpace("#canvas");
        space.setup({ bgcolor: "#123" });
        form = space.getForm();

        Drawable.setSpaceForm(space, form);

        const sim = new Simulation({
            animalCount: 20,
            foodCount: 50,
            survivalSteepness: 2,
            evolutionSpeedup: 1,
            timePerEpoch: 40,
            deltaTime: 0.01,
            space: space,
            form: form,
        });

        space.add(() => sim.update());

        space.play();
    });

    onDestroy(() => {
        space.stop();
    })
</script>

<canvas id="canvas" />

<style>
    :global(#canvas) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
</style>
