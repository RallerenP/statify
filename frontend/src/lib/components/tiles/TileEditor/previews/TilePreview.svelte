<script lang="ts">
import PieChartPreview from "./PieChartPreview.svelte";
import StatTilePreview from "./StatTilePreview.svelte";

    export let title;
    export let tileType;
    export let value;
</script>

<div on:click class="stats h-full w-full" id={value}>
    <div class="stat bg-base-200 {'transition-colors hover:bg-base-300 cursor-pointer'}">
        <div class="stat-title">{title}</div>
        {#if tileType === 'Stat'}
            <StatTilePreview {value}/>
        {:else if tileType === 'Piechart'}
            <PieChartPreview {value}/>
        {/if}
    </div>
</div>