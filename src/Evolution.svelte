<script lang="ts">
    import { Evolution } from "./logic/world/Evolution";
    import { EvolutionRenderer } from "./logic/world/EvolutionRenderer";
    import { onMount } from "svelte";

    const evolution = new Evolution({
        nInstances: 100,
        survivalSteepness: 2,
        timePerEpoch: 40,
        deltaTime: 0.01,
    });

    onMount(async () => {
        new EvolutionRenderer({ evolution: evolution, canvasId: "canvas" });
        update();
    });

    const update = () => {
        evolution.update();
        requestAnimationFrame(update);
    }
</script>

<canvas id="canvas" />
