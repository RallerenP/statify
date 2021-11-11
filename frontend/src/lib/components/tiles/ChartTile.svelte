<script lang="ts">
    import GridStackItem from "../GridStack/GridStackItem.svelte";
    import { getContext, onMount } from 'svelte';
    import type { Writable } from "svelte/store";
    import type { StatTileDTO } from "../../api/dtos/TileDTOs";
    import Spinner from "../../Spinner.svelte";
    import Chart from "chart.js/auto"
    
    export let id;
    export let gridOptions: {w: number, h: number, x: number, y: number};
    export let content: StatTileDTO
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
    
    const edit = getContext<Writable<boolean>>('EDIT_MODE')
  
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
            options: {}
        }); 
    }

  </script>
  
  <GridStackItem {id} class="max-h-full " width={gridOptions.w} height={gridOptions.h} x={gridOptions.x} y={gridOptions.y} >
    <div class="stats h-full w-full ">
      <div class="stat bg-base-200 {$edit && 'transition-colors hover:bg-base-300 cursor-pointer' }">
        {#if loading}
          <Spinner />
        {:else}
          <div class="stat-title">{content.label}</div> 
          <div class="stat-value"><canvas bind:this={canvas} width={gridOptions.w * 80}></canvas></div>
        {/if}
      </div>
    </div>
  </GridStackItem>