<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import ModalButton from "../../Modal/ModalButton.svelte";
  import ModalTitle from "../../Modal/ModalTitle.svelte";

  export let open;
  export let create = false;

  const tileSizeOptions = [
    {
      id: 0,
      x: 1,
      y: 1
    },
    {
      id: 1,
      x: 2,
      y: 1
    },
    {
      id: 2,
      x: 1,
      y: 2
    },
  ]

  const tileTypes = [
    'StatTile',
    'ChartTile'
  ]
</script>

<Modal class="max-w-[800px]" {open}>
  <ModalTitle>Create new tile</ModalTitle>
  <div class="h-full w-full flex-grow bg-green-200">
    <div class="flex bg-red-500">
      <div class="flex-grow">
        Settings
      </div>
      <div class="flex-grow bg-green-500">
        Preview
      </div>
    </div>
    <div class="bg-pink-500">
      Tile Selector
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
<!-- 
    {#if !selectedTileOption}
    <div class="flex">
      <div class="max-w-{50}">
        <p class="text-lg">Current tile data</p>
        <p class="text-sm">Tile Size: <span class="text-primary">{tileSizeX} x {tileSizeY}</span></p>
        <p class="text-sm">Tile Type: <span class="text-primary">{tileType}</span></p>
        <p class="text-sm">Tile Label: <span class="text-primary">{tileLabel}</span></p>
      </div>
      <div class="flex-grow"></div>
      <div class="w-6/12">
        <p>Preview</p>
        <StatTile
        id={previewContent._id} 
        gridOptions={{w: tileSizeX, h: tileSizeY, x: 0, y: 0}}
        content={previewContent}
        />
      </div>
    </div>
    <div class="flex mt-10">
      <div class="w-1/3 p-4"><img class="hover:border-primary hover:border-2 hover:cursor-pointer" src="{TileSize}" alt="" on:click={() => handleTileStyleClicked('size')}></div>
      <div class="w-1/3 p-4"><img class="hover:border-primary hover:border-2 hover:cursor-pointer" src="{TileStyle}" alt="" on:click={() => handleTileStyleClicked('type')}></div>
      <div class="w-1/3 p-4"><img class="hover:border-primary hover:border-2 hover:cursor-pointer" src="{TileLabel}" alt="" on:click={() => handleTileStyleClicked('label')}></div>
    </div>
    <div class="modal-action">
      <div class="btn" on:click={() => deleteModalOpen = false}>Close</div>
    </div>

    {:else}
    <p class="text-lg">Editing tile {selectedTileOption}</p>
    {#if selectedTileOption === 'size'}
      <div>
        <ul>
        {#each tileSizeOptions as tileSizeOption}
          <li><button id={`${tileSizeOption.id}`} class="hover:bg-primary rounded" on:click={ (e) => handleClickedTileSize(e)}>{tileSizeOption.x} - {tileSizeOption.y}</button></li>
        {/each}
        </ul>
      </div>
    {:else if selectedTileOption === 'type'}
      <div>
        <ul>
          {#each tileTypes as types}
            <li><button id={`${types}`} class="hover:bg-primary rounded" on:click={ (e) => handleChangedTileType(e)}>- {types}</button></li>
          {/each}
        </ul>
      </div>
    {:else}
      <div><input on:keypress="{(e) => handleKeypress(e)}" class="p-2 mx-1 rounded w-full input input-ghost" placeholder="New label for tile..."></div>
    {/if}
    <div class="btn btn-error mt-6" on:click={() => handleTileStyleClicked('')}>Back</div>

    {/if} -->
