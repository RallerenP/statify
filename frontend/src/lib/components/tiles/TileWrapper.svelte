<script lang="ts">
import type { TileDTO } from "../../api/dtos/TileDTOs";
import { createEventDispatcher } from 'svelte';
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
    dto={tile.content}
    on:delete
    on:update={(e) => handleUpdate(tile, e.detail)}
    {tile}
  />
{/each}
