<script lang="ts">
    import { onMount } from 'svelte';
    import { getAllMenus } from "../api/api";
import Spinner from '../Spinner.svelte';
    import TreeList from "../TreeList/TreeList.svelte";
    import type { TreeListItem } from "../TreeList/TreeListItem";

    let tree;

    onMount(async () => {
        tree = await getAllMenus();
    })
</script>

<div class="flex flex-col border-r bg-base-200 border-base-300 w-[300px] p-2 relative">
    {#if !tree}
        <div class="flex w-full h-full justify-center items-center">
            <Spinner class="w-8 h-8"></Spinner>
        </div>
        {:else}
        <TreeList items={tree} />
    {/if}
</div>