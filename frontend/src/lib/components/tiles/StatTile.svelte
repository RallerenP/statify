<script lang="ts">
  import GridStackItem from "../GridStack/GridStackItem.svelte";
  import { getContext, onMount, createEventDispatcher } from 'svelte';
  import type { Writable } from "svelte/store";
  import type { StatTileDTO } from "../../api/dtos/TileDTOs";
  import Spinner from "../../Spinner.svelte";
  import { edit } from "../../../stores/stores";
  import { deleteStat, updateStat } from "../../api/api";

  const dispatch = createEventDispatcher();
  
  export let id;
  export let gridOptions: {w: number, h: number, x: number, y: number};
  export let content: StatTileDTO

  let loading: boolean = true;
  let item;

  let value;

  const lastMonthAmount = 5000
  let percentage = () => {
      return Math.round(((value / lastMonthAmount) * 100) - 100);
  }

  onMount(async () => {
    value = await fetch(content.source).then(res => res.json());
    loading = false;
  })

  const handleKeypress = async (e) => {
    if (e.key !== "Enter") return;

    const dto = { label: (e.target as HTMLInputElement).value }

    e.target.blur();

    content = await updateStat(content._id, dto)
    
  }

  const handleDelete = async () => {
    await deleteStat(content._id);
    dispatch('delete', item.getWidget())
  }
</script>

<GridStackItem bind:this={item} {id} class="max-h-full " width={gridOptions.w} height={gridOptions.h} x={gridOptions.x} y={gridOptions.y} >
  <div class="stats h-full w-full ">
    <div class="stat bg-base-200 {$edit && 'transition-colors hover:bg-base-300 cursor-pointer' }">
      {#if loading}
        <Spinner />
      {:else}
        {#if $edit}
          <label class="input-group flex w-full box-border">
            <span class="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </span>
            <input 
              class="stat-title bg-transparent flex-shrink w-3/4" 
              value={content.label} 
              on:keypress="{(e) => handleKeypress(e)}"
            >
            <button on:click={() => handleDelete() }
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </label>
          
        {:else}
          <div class="stat-title">{content.label}</div> 
        {/if}
        
        <div class="stat-value">{value}</div> 
        <div class="stat-desc"><span class={percentage() > 0 ? 'text-success' : 'text-error'}> {percentage()}% </span> {value > 5000 ? 'more' : 'less'} than last month</div>
      {/if}
    </div>
  </div>
</GridStackItem>