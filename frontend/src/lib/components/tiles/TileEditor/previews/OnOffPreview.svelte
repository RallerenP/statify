<script>

  export let value

</script>

<div class="stat-value">
  {#if value}
    <span class='text-success'>Online</span>
  {:else}
    <span class='text-error'>Offline</span>
  {/if}
</div>
<div class="stat-desc">Show service status</div>