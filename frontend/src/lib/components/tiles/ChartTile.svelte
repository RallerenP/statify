<script lang="ts">
  import GridStackItem from "../GridStack/GridStackItem.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import Spinner from "../../Spinner.svelte";
  import Chart, { ChartTypeRegistry } from "chart.js/auto";
  import { edit } from "../../../stores/stores";
  import type { TileContentDTO } from "../../api/dtos/TileDTOs";
  import type { PieChartDTO } from "./TileEditor/previews/dataTypes";

  const dispatch = createEventDispatcher();

  export let id;
  export let gridOptions: { w: number; h: number; x: number; y: number };
  export let content: TileContentDTO;
  export let widget = {};
  let loading: boolean = true;
  let item;

  const colors = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
  ];

  let values;
  let generateBarColors = () => {
    let pickedColors = [];
    for (let i = 0; i < chartData.labels.length; i++) {
      pickedColors.push(colors[i % colors.length]);
    }
    return pickedColors;
  };

  let chartData: PieChartDTO;
  let tileStyle = "pie";

  let chart;
  let canvas;

  onMount(async () => {
    values = await fetch(content.dataSource).then(res => res.json());
    loading = false;

    chartData = {
      labels: ["a", "b", "c", "d", "e"],
      data: values.value,
    };
  });

  const handleDelete = async () => {
    //await deleteStat(content._id);
    dispatch("delete", item.getWidget());
  };

  $: if (canvas) render(tileStyle);

  function render(tileStyle) {
    if (chart !== undefined) chart.destroy();

    if (tileStyle !== "line") {
      chart = new Chart(canvas, {
        type: tileStyle,
        data: {
          labels: chartData.labels,
          datasets: [
            {
              backgroundColor: generateBarColors(),
              data: chartData.data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else {
      chart = new Chart(canvas, {
        type: tileStyle,
        data: {
          labels: chartData.labels,
          datasets: [
            {
              borderColor: "rgb(75, 192, 192)",
              data: chartData.data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  let containerHeight;
  let containerWidth;
  let min;

  $: if (containerHeight && containerWidth && chart) {
    min = Math.min(containerHeight * 0.7, containerWidth * 0.7);
    chart.canvas.parentNode.style.height = `${containerHeight * 0.9 - 20}px`;
    chart.canvas.parentNode.style.width = `${containerWidth * 0.7}px`;
  }
</script>

<GridStackItem
  bind:this={item}
  {id}
  class="max-h-full "
  width={gridOptions.w}
  height={gridOptions.h}
  x={gridOptions.x}
  y={gridOptions.y}
>
  <div
    class="stats h-full w-full"
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
  >
    <div
      style="height: {containerHeight}px; width: {containerWidth}px"
      class="stat bg-base-200 {$edit &&
        'transition-colors hover:bg-base-300 cursor-pointer'}"
    >
      {#if loading}
        <Spinner />
      {:else}
        {#if $edit}
          <button on:click={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <select class="select select-bordered w-full max-w-xs" bind:value={tileStyle}>
            <option on:click={() => (tileStyle = "pie")}>pie</option>
            <option on:click={() => (tileStyle = "bar")}>bar</option>
            <option on:click={() => (tileStyle = "line")}>line</option>
          </select>
        {/if}
        <div class="stat-title h-[20px]">{content.label}</div>
        <div
          class="stat-value flex justify-center items-center {$edit &&
            'pointer-events-none'}"
        >
          <div class="">
            <canvas bind:this={canvas} />
          </div>
        </div>
      {/if}
    </div>
  </div>
</GridStackItem>
