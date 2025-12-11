<script>
  import MapFrame from "./MapFrame.svelte";
  import GeoWorld from "./GeoWorld.svelte";
  import countries from "../data/countries.json";
  import { topoBopValues, selectedPeriod, allPeriods } from "../stores/bopStore.js";


  let hovered = null;
  let selected = null;

  $: hoveredInfo = hovered ? countryLookup[hovered.id] : null;
  $: selectedInfo = selected ? countryLookup[selected.id] : null;

  $: hoveredValue = hovered ? bopValues[hovered.id] : null;
  $: selectedValue = selected ? bopValues[selected.id] : null;

  const countryLookup = {};
  for (const c of countries) {
    countryLookup[c.id] = c;
  }

  $: bopValues = $topoBopValues;
  function id(f) {
    console.log(f);
  }
</script>

<div class="controls">
  <label>
    Quarter:
    <select bind:value={$selectedPeriod}>
      {#each $allPeriods as period}
        <option value={period}>{period}</option>
      {/each}
    </select>
  </label>
</div>

<div class="layout">
  <MapFrame let:width let:height>
    <GeoWorld
      {width}
      {height}
      {hovered}
      {selected}
      dataValues={bopValues}
      on:hover={(e) => (hovered = e.detail)}
      on:select={(e) => (selected = e.detail)}
    />
  </MapFrame>

  <div class="info">
    <h2>Country Info</h2>

    {#if selected}
      <p><strong>Selected:</strong> {selected.properties.name}</p>
      <p>
        <strong>BOP:</strong>
        {selectedValue !== null ? selectedValue : "No data"}
      </p>
    {:else}
      <p>No country selected.</p>
    {/if}
  </div>
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 1rem;
  }

  .info {
    border: 1px solid #ddd;
    padding: 0.75rem;
  }

  @media (max-width: 1000px) {
    .layout {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  }

    .controls {
    margin-bottom: 1rem;
    font-family: system-ui, sans-serif;
  }

  select {
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
  }
</style>

