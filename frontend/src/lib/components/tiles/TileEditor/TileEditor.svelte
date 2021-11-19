<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import ModalButton from "../../Modal/ModalButton.svelte";
  import ModalTitle from "../../Modal/ModalTitle.svelte";
  import InputField from "./InputField.svelte";
  import TilePreview from "./TilePreview.svelte";
  import { Splide, SplideSlide, Options } from '@splidejs/svelte-splide';
  import '@splidejs/splide/dist/css/splide.min.css';
  import StatTile from "../StatTile.svelte";
  import { url } from '../../../../stores/stores';
  import { createStat } from "../../../api/api";
  import { createEventDispatcher } from 'svelte';

  let dispatch = createEventDispatcher();

  let title = 'default'
  let dataSource = 'http://localhost:3000/random'
  let data_3 = 'Something'
  export let open;
  export let update = false;

  const options: Options = {
    rewind : true,
    perPage: 3,
    gap    : '1rem',
    height : '15rem',
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

</script>

<Modal class="max-w-[1200px]" {open}>
  <ModalTitle>Create new tile</ModalTitle>
  <div class="h-full w-full flex-grow">
    <div class="flex">
      <div class="w-1/2">
        <span class="text-[18px]">Settings</span>
        <div class="form-control mt-2">
          <InputField bind:value={title}>Title</InputField>
          <InputField class="my-4" bind:value={dataSource}>Data Source</InputField>
          <InputField bind:value={data_3}>Data 3</InputField>
        </div> 
      </div>
      <div class="w-1/2 flex flex-col">
        <div class="flex">
          <span class="text-[18px] mb-2">Preview</span>
          <div class="flex-grow"></div>
        </div>
        
        <TilePreview {title} {dataSource} {data_3}></TilePreview>
      </div>
    </div>
  </div>
  <div class="my-2">
    <span class="text-[18px]">Tile Selector</span>
    <Splide options={options}>
      <SplideSlide class="flex-center splide__slide is-active is-visible">
        <div class="w-full h-full p-8">
          <TilePreview {title} {dataSource} {data_3} />
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