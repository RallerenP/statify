<script lang="ts">
  import GridStackItem from "../../GridStack/GridStackItem.svelte";
  import { onMount, createEventDispatcher, tick } from "svelte";
  import Spinner from "../../../Spinner.svelte";
  import Chart from "chart.js/auto";
  import Number from "./Number.svelte";
  import ChartComponent from './Chart.svelte'
  import { edit } from "../../../../stores/stores";
  import type { TileContentDTO } from "../../../api/dtos/TileDTOs";
  import { TileTypes } from  '../../../api/dtos/TileDTOs'
  import { generateColors } from "./Utils"
  import { deleteTile } from "../../../api/api";
  import OnOff from "./OnOff.svelte";
  import Divider from "./Divider.svelte";
  import Header from "./Header.svelte";
  import Description from "./Description.svelte";
import TileTypeIcon from "./TileTypeIcon.svelte";

  const dispatch = createEventDispatcher();

  export let id;
  export let gridOptions: { w: number; h: number; x: number; y: number };
  export let dto: TileContentDTO[];
  export let widget = {};
  
  let loading: boolean = true;
  let item;
  let content: { type: TileTypes, data: { value: any, description: string }}[] = [];
  let chart;
  let canvas;
  let selected: { type: TileTypes, data: { value: any, description: string }};
  let index = 0;

  $: selected = content[index];

  onMount(async () => {
    content = await Promise.all(dto.map(async (content) => { return { type: content.type, data: await fetch(content.dataSource).then(res => res.json()) } } ) )
    console.log(content);
    selected = content[0];
    loading = false;
  });

  const handleKeypress = async (e) => {
    if (e.key !== "Enter") return;

    const dto = { label: (e.target as HTMLInputElement).value }

    e.target.blur();

    dispatch('update', { ...dto, ...dto })
  }

  const handleDelete = async () => {
    await deleteTile(id)
    dispatch("delete", item.getWidget());
  };
</script>

<GridStackItem bind:this={item} {id} class="max-h-full" width={gridOptions.w} height={gridOptions.h} x={gridOptions.x} y={gridOptions.y}>
  <div class=" h-full w-full">
    <div class="p-4 rounded-box bg-base-200 {$edit && 'transition-colors hover:bg-base-300 cursor-pointer'} h-full flex flex-col">
      
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
              value={dto[index].label} 
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
          {#if selected.type !== TileTypes.Header && selected.type !== TileTypes.Divider && selected.type !== TileTypes.Description }
          <div class="flex">
            <div class="stat-title h-[20px]">{dto[index].label}</div>
            <div class="flex-grow"></div>
            {#each dto as item, _index}
              <span title={dto[_index].label} class="mx-1" on:click={() => index = _index}>
                <TileTypeIcon type={dto[_index].type} />
              </span>
            {/each}
            <div></div>
            <div title="{selected.data.description}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          {/if}
        {/if}
        <div class="flex flex-grow justify-center items-center {$edit && 'pointer-events-none'}">
          <div class="h-[90%] w-[90%]">
            {#if selected.type === TileTypes.Number}
              <Number dataSource={dto[index].dataSource}></Number>
            {:else if selected.type === TileTypes.PieChart}
              <ChartComponent type="pie" data={content[index].data}></ChartComponent>
            {:else if selected.type === TileTypes.LineChart}
              <ChartComponent type="line" data={content[index].data}></ChartComponent>
            {:else if selected.type === TileTypes.BarChart}
              <ChartComponent type="bar" data={content[index].data}></ChartComponent>
            {:else if selected.type === TileTypes.ScatterChart}
              <ChartComponent type="scatter" data={content[index].data}></ChartComponent>   
            {:else if selected.type === TileTypes.OnOff}
              <OnOff dataSource={dto[index].dataSource} />
            {:else if selected.type === TileTypes.Divider}
              <Divider/>
            {:else if selected.type === TileTypes.Header}
              <Header title={dto[index]}/>
            {:else if selected.type === TileTypes.Description}
              <Description content={dto[index]}/>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
</GridStackItem>