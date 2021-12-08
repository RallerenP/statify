<script lang="ts">
import { TileDTO, TileTypes } from "../../api/dtos/TileDTOs";
import Number from "./tileTypes/Number.svelte";
import { createEventDispatcher } from 'svelte';
import OnOff from "./tileTypes/OnOff.svelte";
import Chart from "./tileTypes/Chart.svelte";
import Tile from './tileTypes/Tile.svelte';
import Divider from "./tileTypes/Divider.svelte";
import Header from "./tileTypes/Header.svelte";
import Description from "./tileTypes/Description.svelte";
import Content from "../../Content.svelte";

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
    dto={tile.content}
    on:delete
    on:update={(e) => handleUpdate(tile, e.detail)}
  />
{/each}
