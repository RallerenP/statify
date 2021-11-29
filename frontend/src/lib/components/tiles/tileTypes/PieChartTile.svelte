<script lang="ts">
  import GridStackItem from "../../GridStack/GridStackItem.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import Spinner from "../../../Spinner.svelte";
  import Chart from "chart.js/auto";
  import { edit } from "../../../../stores/stores";
  import type { TileContentDTO } from "../../../api/dtos/TileDTOs";
  import { generateColors } from "./Utils"

  const dispatch = createEventDispatcher();

  export let id;
  export let gridOptions: { w: number; h: number; x: number; y: number };
  export let content: TileContentDTO;
  export let widget = {};
  let loading: boolean = true;
  let item;
  let response;
  let chart;
  let canvas;

  onMount(async () => {
    response = await fetch(content.dataSource).then(res => res.json());
    loading = false;
  });

  const handleKeypress = async (e) => {
    if (e.key !== "Enter") return;

    const dto = { label: (e.target as HTMLInputElement).value }

    e.target.blur();

    dispatch('update', { ...content, ...dto })
  }

  const handleDelete = async () => {
    dispatch("delete", item.getWidget());
  };

  $: if (canvas) render();

  function render() {
    if (chart !== undefined) chart.destroy();
    chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: response.value.labels,
        datasets: [
          {
            backgroundColor: generateColors(response.value.numbers.length),
            data: response.value.numbers,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  let containerHeight;
  let containerWidth;
  let min;
  
  $: if (containerHeight && containerWidth && chart) {
    min = Math.min(containerHeight * 0.7, containerWidth * 0.7);
    chart.canvas.parentNode.style.height = `${containerHeight * 0.9 - 20}px`;
    chart.canvas.parentNode.style.width = `${containerWidth * 0.7}px`;
  }
  
</script>

<GridStackItem bind:this={item} {id} class="max-h-full" width={gridOptions.w} height={gridOptions.h} x={gridOptions.x} y={gridOptions.y}>
  <div class="stats h-full w-full" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
    <div class="stat bg-base-200 {$edit && 'transition-colors hover:bg-base-300 cursor-pointer'}">
      {#if loading}
        <Spinner />
      {:else}
        {#if $edit}
          <label class="input-group flex w-full box-border">
            <span class="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </span>
            <input 
              class="stat-title bg-transparent flex-shrink w-3/4" 
              value={content.label} 
              on:keypress="{(e) => handleKeypress(e)}"
            >
            <button on:click={() => handleDelete() }
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </label>
          {:else}
          <div class="stat-title h-[20px]">{content.label}</div>
        {/if}
        <div class="stat-value flex justify-center items-center {$edit && 'pointer-events-none'}">
          <div><canvas bind:this={canvas} /></div>
        </div>
      {/if}
    </div>
  </div>
</GridStackItem>
