<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import ModalButton from "../../Modal/ModalButton.svelte";
  import ModalTitle from "../../Modal/ModalTitle.svelte";
  import InputField from "./InputField.svelte";
  import TilePreview from "./TilePreview.svelte";

  let title = 'default'
  let dataSource = 'http://localhost:3000/random'
  let data_3 = 'Something'
  export let open;
  export let create = false;

</script>

<Modal class="max-w-[800px]" {open}>
  <ModalTitle>Create new tile</ModalTitle>
  <div class="h-full w-full flex-grow">
    <div class="flex">
      <div class="w-1/2">
        <span class="text-[18px]">Settings</span>
        <div class="form-control p-2">
          <InputField bind:value={title}>Title</InputField>
          <InputField bind:value={dataSource}>Data Source</InputField>
          <InputField bind:value={data_3}>Data 3</InputField>
        </div> 
      </div>
      <div class="w-1/2">
        <span class="text-[18px]">Preview</span>
        <TilePreview {title} {dataSource} {data_3}></TilePreview>
      </div>
    </div>
    <div class="">
      <span class="text-[18px]">Tile Selector</span>
    </div>
  </div>
  <div class="w-full flex justify-end my-2">
    <ModalButton on:click={() => open = !open}>
      Close
    </ModalButton>
    <ModalButton on:click={() => open = !open} type="primary">
      { create ? 'Create' : 'Update' }
    </ModalButton>
  </div>
</Modal>