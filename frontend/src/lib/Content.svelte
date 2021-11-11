<script lang="ts">
  import GridStack from "./components/GridStack/GridStack.svelte";
  import GridStackItem from "./components/GridStack/GridStackItem.svelte";
  import { getContext, onMount } from 'svelte';
  import type { Writable } from "svelte/store";
  import StatTile from "./components/tiles/StatTile.svelte";
  import Spinner from "./Spinner.svelte";
  import { getTiles, updateTile } from "./api/api";
  import type { TileDTO } from "./api/dtos/TileDTOs";
import ChartTile from "./components/tiles/ChartTile.svelte";

  let edit = getContext<Writable<boolean>>('EDIT_MODE');
  let loading = true;
  let tiles: TileDTO[];

  const handleChange = (changeEvent) => {
    const changed = changeEvent.detail.map((obj) => {
      return { id: obj.el.attributes['data-id'].value, values: { width: obj.w, height: obj.h, x: obj.x, y: obj.y } }
    });

    console.log(changed);
    

    changed.forEach(change => {
      updateTile(change.id, change.values);
    });
  }

  onMount(async () => {
    tiles = await getTiles('/super-ny-menu-punkt');
    console.log(tiles)
    loading = false;
  })
</script>

<div class="flex-grow overflow-y-auto overflow-x-hidden {loading && 'flex justify-center items-center'}">
  {#if loading}
    <Spinner />
  {:else}
    <GridStack lock={!$edit} on:change={handleChange}>

      {#each tiles as tile}
        {#if !tile.content.source.includes('array')}
          <StatTile 
            id={tile._id} 
            gridOptions={{w: tile.width, h: tile.height, x: tile.x, y: tile.y}}
            content={tile.content}
          />
        {:else}
          <ChartTile 
            id={tile._id} 
            gridOptions={{w: tile.width, h: tile.height, x: tile.x, y: tile.y}}
            content={tile.content}
          />
        {/if}
      {/each}
      
    </GridStack>
  {/if}
  
</div>
