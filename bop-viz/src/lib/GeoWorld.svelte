<script>
    import { onMount } from "svelte";
    import * as topojson from "topojson-client";
    import { geoPath } from "d3-geo";
    import { geoRobinson } from "d3-geo-projection";
    import worldData from "../data/world-110m.json";

    export let width;
    export let height;

    export let hovered = null;
    export let selected = null;

    let countries = [];
    let path; // D3 path generator

    onMount(() => {
        const geo = topojson.feature(worldData, worldData.objects.countries);
        countries = geo.features;
        updateProjection();
    });

    $: if (width && height) {
        updateProjection();
    }

    function updateProjection() {
        if (!width || !height) return;

        // @ts-ignore
        const projection = geoRobinson().fitExtent(
            [
                [20, 20],
                [width - 20, height - 20],
            ],
            { type: "Sphere" },
        );

        path = geoPath(projection);
    }

    function handleHover(f) {
        dispatch("hover", f);
    }

    function handleSelect(f) {
        dispatch("select", f);
    }

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<svg {width} {height}>
    {#if path}
        {#each countries as c}
            <path
            d={path(c)}
            class="
                country
                {hovered === c ? 'is-hovered' : ''}
                {selected === c ? 'is-selected' : ''}
            "
            on:mouseenter={() => handleHover(c)}
            on:click={() => handleSelect(c)}
            />
        {/each}
    {/if}
</svg>

<style>
.country {
  fill: #e0e0e0;
  stroke: #666;
  stroke-width: 0.5;
  cursor: pointer;
  transition: fill 0.15s ease, stroke 0.15s ease, stroke-width 0.15s ease;
}

.country.is-hovered {
  fill: #f5c76f;
  stroke: #444;
  stroke-width: 0.7;
}

.country.is-selected {
  fill: #f08a4b;
  stroke: #222;
  stroke-width: 1;
}

</style>
