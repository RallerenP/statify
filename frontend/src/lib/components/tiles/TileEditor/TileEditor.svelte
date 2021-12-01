<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import ModalButton from "../../Modal/ModalButton.svelte";
  import ModalTitle from "../../Modal/ModalTitle.svelte";
  import InputField from "./InputField.svelte";
  import TilePreview from "./previews/TilePreview.svelte";
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/splide/dist/css/splide.min.css';
  import { url } from '../../../../stores/stores';
  import { createEventDispatcher } from 'svelte';
  import { TileTypes } from "../../../api/dtos/TileDTOs";
  import { createTile } from "../../../api/api";
  import type { DataSourceDTO } from "../../../api/dtos/DataSourceDTO";

  let dispatch = createEventDispatcher();

  let label = 'default'
  let dataSource = 'http://localhost:3000/random'
  let data_3 = 'Something'
  let value: any = 5000
  let tileType: TileTypes = TileTypes.Number
  let valid = false;
  export let open;
  export let update = false;

  const handleDataSourceChange = (e: KeyboardEvent) => {
    if (e.key === "Enter") get();
  }

  async function get() {
    try {
      const data: DataSourceDTO = await fetch(dataSource).then(res => res.json());

      if (data.compatible.includes(tileType)) valid = true;
      else valid = false;

      value = data.value;
    } catch(e) {
      valid = false;
    }
    
  }

  const options = {
    rewind : true,
    perPage: 3,
    gap    : '1rem',
    height : '15rem',
    padding : {
      left : '2.5%',
      right : '2.5%'
    },
    breakpoints: {
      1000: {
        perPage: 1,
      },
    },
  }

  $: console.log(open)

  const handleCreate = async () => {
    console.log(label, dataSource, tileType)
    await createTile($url, {
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      type: tileType,
      content: {
        label,
        dataSource
      }
    })

    dispatch('created');
    open = false;
  }


  const handleTileTypeSelect = (type: TileTypes, _value: any) => {
    tileType = type;
    value = _value;

    get();
  }

  get();

</script>

<Modal class="max-w-[1200px]" {open}>
  <ModalTitle>Create new tile</ModalTitle>
  <div class="h-full w-full flex-grow">
    <div class="flex">
      <div class="w-1/2">
        <span class="text-[18px]">Settings</span>
        <div class="form-control mt-2">
          <InputField bind:value={label}>Title</InputField>
          <div class="my-4 flex items-center">
            <InputField class="flex-shrink-0" on:keydown={handleDataSourceChange} bind:value={dataSource}>Data Source</InputField>
            <!-- TODO: Fix -->
            {#if !valid}
            <div class="tooltip mx-4 bg-red" data-tip="Datasource is not compatible with this tile!">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-error h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            {/if}
            
          </div>
          
          <InputField bind:value={data_3}>Data 3</InputField>
        </div> 
      </div>
      <div class="w-1/2 flex flex-col">
        <div class="flex">
          <span class="text-[18px] mb-2">Preview</span>
          <div class="flex-grow"></div>
        </div>
        <TilePreview {value} {tileType} title={label}></TilePreview>
      </div>
    </div>
  </div>
  <div class="mt-16">
    <span class="text-[18px]">Tile Selector</span>
    <Splide options={options}>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect(TileTypes.Number, 5000) } title='Stat' tileType={TileTypes.Number} value=5000/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect(TileTypes.PieChart, [2, 5, 7]) } title='Piechart' tileType={TileTypes.PieChart} value={[2, 5, 7]}/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect(TileTypes.LineChart, [10, 3, 8]) } title='Linechart' tileType={TileTypes.LineChart} value={[10, 3, 8]}/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect(TileTypes.BarChart, [10, 3, 8]) } title='Barchart' tileType={TileTypes.BarChart} value={[10, 3, 8]}/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect(TileTypes.ScatterChart, [10, 3, 8]) } title='Scatterchart' tileType={TileTypes.ScatterChart} value={[10, 3, 8]}/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect(TileTypes.OnOff, true) } title='On Off Tile' tileType={TileTypes.OnOff} value={true}/>
        </div>
      </SplideSlide>
    </Splide>
  </div>
  <div class="w-full flex justify-end my-2">
    <ModalButton on:click={() => open = !open}>
      Close
    </ModalButton>
    <ModalButton disabled={!valid} on:click={() => handleCreate()} type="primary">
      { !update ? 'Create' : 'Update' }
    </ModalButton>
  </div>
</Modal>