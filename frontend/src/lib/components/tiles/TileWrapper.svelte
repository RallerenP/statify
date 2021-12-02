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
    content={tile.content}
    on:delete
    on:update={(e) => handleUpdate(tile, e.detail)}
    tileType={tile.type}
  >
  {#if tile.type === TileTypes.Number}
    <Number dataSource={tile.content.dataSource}></Number>
  {:else if tile.type === TileTypes.PieChart}
    <Chart type="pie" dataSource={tile.content.dataSource}></Chart>
  {:else if tile.type === TileTypes.LineChart}
    <Chart type="line" dataSource={tile.content.dataSource}></Chart>
  {:else if tile.type === TileTypes.BarChart}
    <Chart type="bar" dataSource={tile.content.dataSource}></Chart>
  {:else if tile.type === TileTypes.ScatterChart}
    <Chart type="scatter" dataSource={tile.content.dataSource}></Chart>   
  {:else if tile.type === TileTypes.OnOff}
    <OnOff dataSource={tile.content.dataSource} />
  {:else if tile.type === TileTypes.Divider}
    <Divider/>
  {:else if tile.type === TileTypes.Header}
    <Header title={tile.content}/>
  {:else if tile.type === TileTypes.Description}
    <Description content={tile.content}/>
  {/if}
  </Tile>

{/each}
