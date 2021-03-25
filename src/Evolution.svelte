<script lang="ts">
    import * as math from "mathjs";
    import { Brain } from "./logic/animal/Brain";
    import { Animal } from "./logic/animal/Animal";
    import { Layer } from "./logic/animal/Layer";
import { Evolution } from "./logic/world/Evolution";
import { EvolutionRenderer } from "./logic/world/EvolutionRenderer";

    const evolution = new Evolution({
        nInstances : 100,
        survivalSteepness : 2,
        timePerEpoch : 40,
        deltaTime : 0.01,
    });

    evolution.evolve(10);

    const renderer = new EvolutionRenderer({evolution : evolution, canvasId : "canvas"});
</script>

<canvas id="canvas"></canvas>