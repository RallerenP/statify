<script lang="ts">
  import { ChevronDown, ChevronLeft } from 'svelte-hero-icons';
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import { children } from 'svelte/internal';
  import { createNewMenuItem, deleteMenuItem, getMenuItem } from '../api/api';
  import Spinner from '../Spinner.svelte';
  import type { TreeListItem as TreeListItemType } from './TreeListItem';
  import TreeListItem from './TreeListItem.svelte';
  import { getContext, createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { edit } from '../../stores/stores';
  import router from 'page';

  const dispatch = createEventDispatcher();

  export let item: TreeListItemType
  export let depth: number

  let deleteModalOpen = false;
  let deleteModalLoading = false;

  let loading = false;

  const handleKeypress = async (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const value = (e.target as HTMLInputElement).value;

    loading = true;

    await createNewMenuItem({label: value}, item.url);
    
    item = await getMenuItem(item.url);

    (e.target as HTMLInputElement).value = "";

    loading = false;
  }

  const handleDelete = async (url) => {
    deleteModalLoading = true;

    await deleteMenuItem(url);

    dispatch('delete');

    deleteModalLoading = false;
    deleteModalOpen = false;
  }

  const refresh = async() => {
    item = await getMenuItem(item.url);
  }

  let open = false;
</script>

<div class="h-[48px] my-1 rounded flex" style="margin-left: {depth * 25}px">
  {#if item.children.length || $edit}
  <button class="btn btn-primary w-[48px] btn-ghost flex-grow-0 duration-200" on:click={() => open = !open}>
    {#if !open}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    {/if}
    <!-- <Icon src={open ? ChevronDown : ChevronLeft}></Icon> -->
  </button>
  {:else}
    <div class="w-[48px] flex-shrink-0 flex justify-center items-center">
      <div class="w-2 h-2 rounded-full bg-base-content"></div>
    </div>
    
  {/if}
  <div on:click={() => router(item.url)} class="hover:bg-primary flex items-center p-2 mx-1 rounded w-full hover:text-primary-content transition-colors duration-200 cursor-pointer">
    { item.label }
  </div>
  {#if $edit}
    <button class="btn btn-primary w-[48px] btn-ghost flex-grow-0 duration-200" on:click={() => deleteModalOpen = true}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
    <div id="my-modal" class="modal { deleteModalOpen ? 'modal-open' : '' }">
      <div class="modal-box">
        <p>Are you sure you want to delete <span class="text-primary">{item.label}</span></p> 
        <div class="modal-action">
          <div class="btn" on:click={() => deleteModalOpen = false}>Close</div>
          <div class="btn btn-error w-[100px]" on:click={() => handleDelete(item.url)}>
            {#if deleteModalLoading}
              <Spinner />
            {:else}
              Delete
            {/if}
          </div> 
        </div>
      </div>
    </div>
  {/if}
  
</div>
{#if open}
  {#each item.children as child}
    <TreeListItem item={child} depth={depth + 1} on:delete={() => refresh()}></TreeListItem>
  {/each}
  {#if $edit}
    <div class="h-[48px] my-1 rounded flex" style="margin-left: {(depth + 1) * 25}px">
      <div class="w-[48px] h-[48px] flex justify-center items-center flex-shrink-0 flex-grow-0 duration-200">
        {#if loading}
          <Spinner class="before:h-4 before:w-4" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        {/if}
      </div>
      <input on:keypress="{(e) => handleKeypress(e)}" class="p-2 mx-1 rounded w-full input input-ghost" placeholder="New item...">
    </div>
  {/if}
  
  
{/if}

