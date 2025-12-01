<script>
  import MapFrame from "./MapFrame.svelte";
  import GeoWorld from "./GeoWorld.svelte";
  import countries from "../data/countries.json";
  import { topoBopValues, selectedPeriod } from "../stores/bopStore.js";


  let hovered = null;
  let selected = null;

  const countryLookup = {};
  for (const c of countries) {
    countryLookup[c.id] = c;
  }

  $: bopValues = $topoBopValues;
  function id(f) {
    console.log(f)
    return f?.id ?? "unknown";
  }
</script>

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
      <p><strong>Selected:</strong> {hovered.properties.name}</p>
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
</style>
