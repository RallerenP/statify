<script lang="ts">
import { TileTypes } from "../../api/dtos/TileDTOs";
import PieChartTile from "./tileTypes/PieChartTile.svelte";
import NumberTile from "./tileTypes/NumberTile.svelte";
import { createEventDispatcher } from 'svelte';
import LineChartTile from "./tileTypes/LineChartTile.svelte";
import BarChartTile from "./tileTypes/BarChartTile.svelte";
import ScatterChartTile from "./tileTypes/ScatterChartTile.svelte";
import OnOffTile from "./tileTypes/OnOffTile.svelte";

  const dispatch = createEventDispatcher();

  export let tiles;

  const handleUpdate = (tile, dto) => {
    console.log(tile, dto)
    dispatch('update', {tile, dto})
  }

</script>

{#each tiles as tile}
  {#if tile.type === TileTypes.Number}
    <NumberTile
      id={tile._id}
      gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
      content={tile.content}
      on:delete
      on:update={(e) => handleUpdate(tile, e.detail)}
    />
  {:else if tile.type === TileTypes.PieChart}
    <PieChartTile
      id={tile._id}
      gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
      content={tile.content}
      on:delete
      on:update={(e) => handleUpdate(tile, e.detail)}
    />

  {:else if tile.type === TileTypes.LineChart}
    <LineChartTile
      id={tile._id}
      gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
      content={tile.content}
      on:delete
      on:update={(e) => handleUpdate(tile, e.detail)}
    />

  {:else if tile.type === TileTypes.BarChart}
    <BarChartTile
      id={tile._id}
      gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
      content={tile.content}
      on:delete
      on:update={(e) => handleUpdate(tile, e.detail)}
    />

  {:else if tile.type === TileTypes.ScatterChart}
    <ScatterChartTile
      id={tile._id}
      gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
      content={tile.content}
      on:delete
      on:update={(e) => handleUpdate(tile, e.detail)}
    />

    {:else if tile.type === TileTypes.OnOff}
    <OnOffTile
      id={tile._id}
      gridOptions={{ w: tile.width, h: tile.height, x: tile.x, y: tile.y }}
      content={tile.content}
      on:delete
      on:update={(e) => handleUpdate(tile, e.detail)}
    />
  {/if}
{/each}
