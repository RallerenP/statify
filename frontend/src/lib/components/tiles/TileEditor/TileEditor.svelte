<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import ModalButton from "../../Modal/ModalButton.svelte";
  import ModalTitle from "../../Modal/ModalTitle.svelte";
  import InputField from "./InputField.svelte";
  import TilePreview from "./previews/TilePreview.svelte";
  import { Splide, SplideSlide, Options } from '@splidejs/svelte-splide';
  import '@splidejs/splide/dist/css/splide.min.css';
  import { url } from '../../../../stores/stores';
  import { createStat } from "../../../api/api";
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from "svelte/store";

  let dispatch = createEventDispatcher();

  let title = 'default'
  let dataSource = 'http://localhost:3000/random'
  let data_3 = 'Something'
  let value: any = 5000
  let tileType = 'Stat'
  export let open;
  export let update = false;
  let splide

  const handleDataSourceChange = (e: KeyboardEvent) => {
    if (e.key === "Enter") get();
  }

  async function get() {
    value = (await fetch(dataSource).then(res => res.json())).value;
  }

  const options: Options = {
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
    await createStat($url, {
      label: title,
      source: dataSource,
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      type: 'StatTile'
    })

    dispatch('created');
    open = false;
  }


  const handleTileTypeSelect = (type, _value) => {
    if (tileType !== type) {
      tileType = type;
      value = _value;
    } 
    
  }
</script>

<Modal class="max-w-[1200px]" {open}>
  <ModalTitle>Create new tile</ModalTitle>
  <div class="h-full w-full flex-grow">
    <div class="flex">
      <div class="w-1/2">
        <span class="text-[18px]">Settings</span>
        <div class="form-control mt-2">
          <InputField bind:value={title}>Title</InputField>
          <InputField class="my-4" on:keydown={handleDataSourceChange} bind:value={dataSource}>Data Source</InputField>
          <InputField bind:value={data_3}>Data 3</InputField>
        </div> 
      </div>
      <div class="w-1/2 flex flex-col">
        <div class="flex">
          <span class="text-[18px] mb-2">Preview</span>
          <div class="flex-grow"></div>
        </div>
        <TilePreview value={value} {tileType} {title}></TilePreview>
      </div>
    </div>
  </div>
  <div class="mt-16">
    <span class="text-[18px]">Tile Selector</span>
    <Splide options={options}>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect('Stat', 5000) } title='Stat' tileType='Stat' value=5000/>
        </div>
      </SplideSlide>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview on:click={() => handleTileTypeSelect('Piechart', [5, 7, 3]) } title='Piechart' tileType='Piechart' value={[2, 5, 7]}/>
        </div>
      </SplideSlide>
    </Splide>
  </div>
  <div class="w-full flex justify-end my-2">
    <ModalButton on:click={() => open = !open}>
      Close
    </ModalButton>
    <ModalButton on:click={() => handleCreate()} type="primary">
      { !update ? 'Create' : 'Update' }
    </ModalButton>
  </div>
</Modal>