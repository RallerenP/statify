<script lang="ts">
  import GridStackItem from "../../GridStack/GridStackItem.svelte";
  import { onMount, createEventDispatcher } from 'svelte';
  import Spinner from "../../../Spinner.svelte";
  import { edit } from "../../../../stores/stores";
  import type { TileContentDTO } from "../../../api/dtos/TileDTOs";
import Loader from "../../../Loader.svelte";

  export let dataSource;

  let data: any;
  let loading = true;

  
  onMount(async () => {
    data = await fetch(dataSource).then(res => res.json());

    loading = false;
  })
</script>

<Loader {loading}>
  <div class="flex-center flex-grow h-full flex-col">
    <div class="stat-value">
      {#if data.value.state}
        <span class='text-success'>Online</span>
        {:else}
          <span class='text-error'>Offline</span>
        {/if}
      </div> 
    <div class="stat-desc">{dataSource}</div>
  </div>
</Loader>

