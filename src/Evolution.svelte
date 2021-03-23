<script lang="ts">
    import * as math from "mathjs";
    import { Brain } from "./logic/animal/Brain";
    import { Animal } from "./logic/animal/Animal";
    import { Layer } from "./logic/animal/Layer";

    const brain = new Brain({
        layers: [
            new Layer({ breadth: 5 }),
            new Layer({ breadth: 10 }),
            new Layer({ breadth: 10 }),
            new Layer({ breadth: 3 }),
        ],
    });
    console.log(brain.process(math.random([5])));

    const animal = new Animal({ brain: brain });

    const offspring = animal.breed(10, 0.1);

    console.log(offspring);
</script>
