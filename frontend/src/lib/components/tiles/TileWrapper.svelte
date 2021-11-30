<script lang="ts">
import { TileDTO, TileTypes } from "../../api/dtos/TileDTOs";
import PieChartTile from "./tileTypes/PieChartTile.svelte";
import NumberTile from "./tileTypes/NumberTile.svelte";
import { createEventDispatcher } from 'svelte';
import LineChartTile from "./tileTypes/LineChartTile.svelte";
import BarChartTile from "./tileTypes/BarChartTile.svelte";
import ScatterChartTile from "./tileTypes/ScatterChartTile.svelte";
import OnOff from "./tileTypes/OnOffTile.svelte";
import Chart from "./tileTypes/Chart.svelte";
import Tile from './tileTypes/Tile.svelte';

  const dispatch = createEventDispatcher();

  export let tiles: TileDTO[];
  export let renderCharts;

  const handleUpdate = (tile, dto) => {
    console.log(tile, dto)
    dispatch('update', {tile, dto})
  }
</script>

{#each tiles as tile}
  <Tile
    id={tile._id}
    gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
    content={tile.content}
    on:delete
    on:update={(e) => handleUpdate(tile, e.detail)}
  >
  {#if tile.type === TileTypes.Number}
    <!-- <Chart type="pie" dataSource={tile.content.dataSource}></Chart> -->
  {:else if tile.type === TileTypes.PieChart}
    <Chart type="pie" dataSource={tile.content.dataSource}></Chart>
  {:else if tile.type === TileTypes.LineChart}
    <Chart type="line" dataSource={tile.content.dataSource}></Chart>
  {:else if tile.type === TileTypes.BarChart}
    <Chart type="bar" dataSource={tile.content.dataSource}></Chart>
  {:else if tile.type === TileTypes.ScatterChart}
    <Chart type="scatter" dataSource={tile.content.dataSource}></Chart>   
  {:else if tile.type === TileTypes.OnOff}
    <OnOff dataSource={tile.content.dataSource} />
  {/if}
  </Tile>

{/each}
