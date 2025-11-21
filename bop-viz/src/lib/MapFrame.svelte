<script>
  import { onMount } from "svelte";

  let container;
  let width = 0;
  let height = 0;

  onMount(() => {
    const observer = new ResizeObserver(entries => {
      const { width: w, height: h } = entries[0].contentRect;
      width = w;
      height = h;
    });

    observer.observe(container);
    return () => observer.disconnect();
  });
</script>

<div bind:this={container} class="frame">
  <slot {width} {height}></slot>
</div>

<style>
  .frame {
    width: 100%;
    height: 80vh;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
</style>
