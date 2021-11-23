<script lang="ts">
import Spinner from "../../../Spinner.svelte";
import { onMount } from "svelte";

    export let title;
    export let dataSource;
    export let data_3;
    let value;
    let loading = true

    onMount(async () => {
        value = await fetch(dataSource).then(res => res.json());
        loading = false
    })

    const update = async () => { 
        loading = true
        value = await fetch(dataSource).then(res => res.json()); 
        loading = false 
    }

    $: if (dataSource !== undefined) {
        update()
    }

</script>

<div class="stats h-full w-full">
    <div class="stat bg-base-200 {'transition-colors hover:bg-base-300 cursor-pointer'}">
        {#if loading}
            <Spinner/>
        {:else}
            <div class="stat-title">{title}</div>
            <div class="stat-value">{value.value}</div> 
            <div class="stat-desc"><span class='text-success'> 50% </span> more than last month</div>
        {/if}
    </div>
</div>