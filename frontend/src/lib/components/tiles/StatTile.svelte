<script lang="ts">
  import GridStackItem from "../GridStack/GridStackItem.svelte";
  import { getContext, onMount } from 'svelte';
  import type { Writable } from "svelte/store";
  import type { StatTileDTO } from "../../api/dtos/TileDTOs";
import Spinner from "../../Spinner.svelte";
  
  export let id;
  export let gridOptions: {w: number, h: number, x: number, y: number};
  export let content: StatTileDTO
  let loading: boolean = true;

  let value;
  
  const edit = getContext<Writable<boolean>>('EDIT_MODE')

  const lastMonthAmount = 5000  
  const amount = Math.round(Math.random() * 10000)
  const percentage = () => {
      if (amount > lastMonthAmount) {
          return Math.round(((amount / lastMonthAmount) * 100) - 100)
      }
      const decrease = lastMonthAmount - amount
      return `😫`;
  }

  onMount(async () => {
    value = await fetch(content.source).then(res => res.json());
    loading = false;
  })
</script>

<GridStackItem {id} class="max-h-full " width={gridOptions.w} height={gridOptions.h} x={gridOptions.x} y={gridOptions.y} >
  <div class="stats h-full w-full ">
    <div class="stat bg-base-200 {$edit && 'transition-colors hover:bg-base-300 cursor-pointer' }">
      {#if loading}
        <Spinner />
      {:else}
        <div class="stat-title">{content.label}</div> 
        <div class="stat-value">{value}</div> 
        <div class="stat-desc">{percentage()}% {amount > 5000 ? 'more' : 'less'} than last month</div>
      {/if}
    </div>
  </div>
</GridStackItem>