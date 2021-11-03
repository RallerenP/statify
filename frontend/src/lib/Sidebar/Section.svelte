<script>
    export let sectionName = undefined
    export let subsections = undefined
</script>

<div class="collapse w-96 border border-base-200 collapse-arrow rounded-box m-2">
    <input type="checkbox"> 
    <div class="collapse-title text-base-content text-xl font-medium">
        {sectionName}
    </div> 
    <div class="collapse-content"> 
        {#each subsections as subsection}
            <div>
                <a href="/">{subsection.name}</a>
            </div>
        {/each}
    </div>
</div>