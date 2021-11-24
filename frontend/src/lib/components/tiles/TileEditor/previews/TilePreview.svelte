<script lang="ts">
  import { TileTypes } from "../../../../api/dtos/TileDTOs";

  import PieChartPreview from "./PieChartPreview.svelte";
  import StatTilePreview from "./StatTilePreview.svelte";

  export let title;
  export let tileType: TileTypes;
  export let value;
</script>


<div on:click class="stats h-full w-full" id={value}>
  <div class="stat bg-base-200 {'transition-colors hover:bg-base-300 cursor-pointer'}">
    <div class="stat-title">{title}</div>
    {#if tileType === TileTypes.Number}
        <StatTilePreview {value}/>
    {:else if tileType === TileTypes.PieChart}
        <PieChartPreview {value}/>
    {/if}
  </div>
</div>