<script>
  import Spinner from "./Spinner.svelte";

  export let loading;
</script>

{#if loading}
  <Spinner />
{:else}
  <slot></slot>
{/if}