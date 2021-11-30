<script lang="ts">
  import GridStackItem from "../../GridStack/GridStackItem.svelte";
  import { onMount, createEventDispatcher } from 'svelte';
  import Spinner from "../../../Spinner.svelte";
  import { edit } from "../../../../stores/stores";
  import type { TileContentDTO } from "../../../api/dtos/TileDTOs";

  export let dataSource;
  let data: any;

  
  onMount(async () => {
    data = await fetch(dataSource).then(res => res.json());
  })
</script>

<div class="stat-value">
  {#if data.value.state}
    <span class='text-success'>Online</span>
    {:else}
      <span class='text-error'>Offline</span>
    {/if}
  </div> 
<div class="stat-desc">{dataSource}</div>