<script lang="ts">
  import GridStackItem from "../GridStack/GridStackItem.svelte";
  import { getContext, onMount } from 'svelte';
  import type { Writable } from "svelte/store";
  import type { StatTileDTO } from "../../api/dtos/TileDTOs";
  import Spinner from "../../Spinner.svelte";
  import Chart from "chart.js/auto"
  import { edit } from "../../../stores/stores";
  
  export let id;
  export let gridOptions: {w: number, h: number, x: number, y: number};
  export let content: StatTileDTO
  export let widget = {};
  let loading: boolean = true;

  let values;
  let barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
  ];
  let chart;
  let canvas;
  
  onMount(async () => {
    values = await fetch(content.source).then(res => res.json());
    loading = false;
  })

  $: if (!loading && canvas) {
      chart = new Chart(canvas, {
          type: "pie",
          data: {
              labels: ["Italy", "France", "Spain", "USA", "Argentina"],
              datasets: [{
              backgroundColor: barColors,
              data: values
              }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
      }); 

      
  }

  let containerHeight;
  let containerWidth;
  let min;

  $: if (containerHeight && containerWidth && chart) {
    min = Math.min(containerHeight * 0.7, containerWidth * 0.7)
    chart.canvas.parentNode.style.height = `${(containerHeight * 0.9) - 20}px`
    chart.canvas.parentNode.style.width = `${containerWidth * 0.7}px`
  }
</script>
  
  <GridStackItem {id} class="max-h-full " width={gridOptions.w} height={gridOptions.h} x={gridOptions.x} y={gridOptions.y} >
    <div class="stats h-full w-full" bind:clientHeight={containerHeight} bind:clientWidth={containerWidth}>
      <div style="height: {containerHeight}px; width: {containerWidth}px" class="stat bg-base-200 {$edit && 'transition-colors hover:bg-base-300 cursor-pointer' }">
        {#if loading}
          <Spinner />
        {:else}
          <div class="stat-title h-[20px]">{content.label}</div> 
          <div class="stat-value flex justify-center items-center {$edit && 'pointer-events-none'}">
            <div class="">
              <canvas bind:this={canvas}></canvas>
            </div>
          </div>
          
          
        {/if}
      </div>
    </div>
  </GridStackItem>