<script lang='ts'>
  import type { TileContentDTO } from "../../../api/dtos/TileDTOs";
  import { createEventDispatcher } from 'svelte';
import EditorTab from "./EditorTab.svelte";

  const dispatch = createEventDispatcher();

  let klass = '';

  export { klass as class };

  export let tabs: TileContentDTO[]
  export let active: TileContentDTO;

  const handleCreateTab = () => {
    dispatch('create')
  }

  const handleChangeTab = (tab) => {
    dispatch('change', tab);
    
    active = tab;
  }
</script>

<div class="tabs gap-1">
  {#each tabs as tab }
    <EditorTab on:click={() => handleChangeTab(tab)} active={tab === active} {tab}></EditorTab> 
  {/each}
  <a class="tab tab-bordered" on:click={handleCreateTab}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  </a>
</div>



<!-- 
<div class="{klass} w-full flex gap-1">

  <span class="bg-base-300 px-4 rounded-t-box pt-2 pb-1 box-border flex justify-center items-center w-12">
    
  </span>
</div> -->

