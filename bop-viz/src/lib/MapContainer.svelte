<script>
  import MapFrame from "./MapFrame.svelte";
  import GeoWorld from "./GeoWorld.svelte";

  let hovered = null;
  let selected = null;

  function onHover(evt) {
    hovered = evt.detail;
  }

  function onSelect(evt) {
    selected = evt.detail;
  }

  function id(f) {
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
      on:hover={onHover}
      on:select={onSelect}
    />
  </MapFrame>

  <div class="info">
    <h2>Country Info</h2>

    {#if hovered}
      <p><strong>Hover:</strong> {id(hovered)}</p>
    {/if}

    {#if selected}
      <p><strong>Selected:</strong> {id(selected)}</p>
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
