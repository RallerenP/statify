<script lang='ts'>
import PieChartPreview from "./previews/PieChartPreview.svelte";

export let tileType;
export let value;

</script>

<div class="stats h-full w-full" id={value}>
    <div class="stat bg-base-200 {'transition-colors hover:bg-base-300 cursor-pointer'}">
        <div class="stat-title">{tileType}</div>
        {#if tileType === 'Stat'}
            <div class="stat-value">{value}</div>
            <div class="stat-desc"><span class='text-success'> 50% </span> more than last month</div>
        {:else if tileType === 'Piechart'}
            <PieChartPreview {value}></PieChartPreview>
        {/if}
    </div>
</div>