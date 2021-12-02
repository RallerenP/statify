<script lang="ts">
  import { TileTypes } from "../../../../api/dtos/TileDTOs";
  import BarChartPreview from "./BarChartPreview.svelte";
  import LineChartPreview from "./LineChartPreview.svelte";
  import OnOffPreview from "./OnOffPreview.svelte";

  import PieChartPreview from "./PieChartPreview.svelte";
  import ScatterChartPreview from "./ScatterChartPreview.svelte";
  import StatTilePreview from "./StatTilePreview.svelte";
  import UiPreview from "./UIPreview.svelte";

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
    {:else if tileType === TileTypes.LineChart}
        <LineChartPreview {value}/>
    {:else if tileType === TileTypes.BarChart}
        <BarChartPreview {value}/>
    {:else if tileType === TileTypes.ScatterChart}
        <ScatterChartPreview {value}/>
    {:else if tileType === TileTypes.OnOff}
        <OnOffPreview {value}/>
    {:else if tileType === TileTypes.Divider || TileTypes.Header || TileTypes.Description}
        <UiPreview type={value}/>
    {/if}
  </div>
</div>