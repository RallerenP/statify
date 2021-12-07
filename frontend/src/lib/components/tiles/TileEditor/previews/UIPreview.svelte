<script>
import { onMount } from "svelte";
import { TileTypes } from "../../../../api/dtos/TileDTOs";

export let type;

onMount( () => {
  console.log(type)
})

</script>

{#if type === TileTypes.Divider}
  <div class="stat-value">
    ----------------
  </div>
  <div class="stat-desc">
    Divide your sections
  </div>
{:else if type === TileTypes.Header}
  <div class="stat-value ">
    Header
  </div>
  <div class="stat-desc">
    Fast overview of data via headers
  </div>
{:else}
  <div class="stat-value text-xl">
      Header & description
  </div>
  <div class="stat-desc">
    Make your section more descriptive
  </div>
{/if}