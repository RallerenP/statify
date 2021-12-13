<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import ModalButton from "../../Modal/ModalButton.svelte";
  import ModalTitle from "../../Modal/ModalTitle.svelte";
  import InputField from "./InputField.svelte";
  import TilePreview from "./previews/TilePreview.svelte";
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/splide/dist/css/splide.min.css';
  import { url } from '../../../../stores/stores';
  import { createEventDispatcher, tick } from 'svelte';
  import { TileContentDTO, TileTypes } from "../../../api/dtos/TileDTOs";
  import { createTile } from "../../../api/api";
  import type { DataSourceDTO } from "../../../api/dtos/DataSourceDTO";
import EditorTabs from "./EditorTabs.svelte";

  let dispatch = createEventDispatcher();

  
  let value: any = 5000
  let valid = false;
  export let open = true;
  export let update = false;
  let titleIsDisabled = false
  let dataSourceIsDisabled = false
  let descriptionIsDisabled = true

  const defaultTab: TileContentDTO = {
    label: 'Default',
    dataSource: 'http://localhost:3000/random',
    description: 'A very description',
    type: TileTypes.Number
  }
  
  let tabs: TileContentDTO[] = [ { ...defaultTab } ];
  let activeTab = tabs[0]

  let label = activeTab.label
  let dataSource = activeTab.dataSource
  let description = activeTab.description;
  let tileType = activeTab.type;

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

  const handleCreate = async () => {
    let width = 2;
    let height = 2;
    if (tileType === TileTypes.Divider) { width = 12; height = 1}
    if (tileType === TileTypes.Header) { width = 3; height = 1}
    if (tileType === TileTypes.Description) { width = 6; height = 2}
    await createTile($url, {
      width,
      height,
      x: 0,
      y: 0,
      content: tabs
    })

    dispatch('created');
    open = false;
  }

  const handleTileTypeSelect = (type: TileTypes, _value: any) => {
    tileType = type;
    value = _value;
    if (tileType === TileTypes.Divider) { titleIsDisabled = true; dataSourceIsDisabled = true; descriptionIsDisabled = true}
    else if (tileType === TileTypes.Header) { titleIsDisabled = false; dataSourceIsDisabled = true; descriptionIsDisabled = true}
    else if (tileType === TileTypes.Description) { titleIsDisabled = false; dataSourceIsDisabled = true; descriptionIsDisabled = false}
    else { dataSourceIsDisabled = false; descriptionIsDisabled = true}

    get();
  }

  get();

  const handleCreateTab = async () => {
    const newTab: TileContentDTO = { ...defaultTab }
    tabs = [ ...tabs, newTab ]
    await tick();
    activeTab = tabs[tabs.length - 1];

    handleChangeTab({ detail: newTab })
  }

  const handleChangeTab = (e) => {
    const tab = e.detail as TileContentDTO;

    label = tab.label;
    dataSource = tab.dataSource;
    description = tab.description;
    tileType = tab.type
  }

  $: {
    activeTab.label = label
    tabs = [...tabs]
  };

  $: {
    activeTab.dataSource = dataSource
    tabs = [...tabs]
  };

  $: {
    activeTab.type = tileType
    tabs = [...tabs]
  };



</script>

<Modal class="max-w-[1200px]" {open}>
  <ModalTitle>Create new tile</ModalTitle>
  <div class="h-full w-full flex-grow">
    <EditorTabs bind:active={activeTab} tabs={tabs} on:create={handleCreateTab} on:change={handleChangeTab} />
    <div class="border-2 border-base-200 p-2 rounded-b-lg rounded-tr-lg">
      <div class="flex p-2">
        <div class="w-1/2">
          <span class="text-[18px]">Settings</span>
          <div class="form-control mt-2">
            <InputField bind:value={label} disabled={titleIsDisabled}>Title</InputField>
            <div class="my-4 flex items-center">
              <InputField class="flex-shrink-0" on:keydown={handleDataSourceChange} bind:value={dataSource} disabled={dataSourceIsDisabled}>Data Source</InputField>
              <!-- TODO: Fix -->
              {#if !valid}
              <div class="tooltip mx-4 bg-red" data-tip="Datasource is not compatible with this tile!">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-error h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              {/if}
              
            </div>
            
            <InputField bind:value={description} disabled={descriptionIsDisabled}>Description</InputField>
          </div> 
        </div>
        <div class="w-1/2 flex flex-col">
          <div class="flex">
            <span class="text-[18px] mb-2">Preview</span>
            <div class="flex-grow"></div>
          </div>
          <div class="h-full bg-base-100 p-4 rounded">
            <TilePreview {value} {tileType} title={label}></TilePreview>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
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
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => {handleTileTypeSelect(TileTypes.Divider, true);} } title={`UI - Divider`} tileType={TileTypes.Divider} value={TileTypes.Divider}/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => {handleTileTypeSelect(TileTypes.Header, true);} } title={`UI - Header`} tileType={TileTypes.Header} value={TileTypes.Header}/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => {handleTileTypeSelect(TileTypes.Description, true);} } title={`UI - Header & Description`} tileType={TileTypes.Description} value={TileTypes.Description}/>
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