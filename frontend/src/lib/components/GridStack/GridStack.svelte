<script lang="ts">
  import 'gridstack/dist/gridstack.min.css';
  import 'gridstack/dist/jq/gridstack-dd-jqueryui';
  import { GridStack, GridStackOptions } from 'gridstack'; 
  import { onMount, createEventDispatcher, onDestroy } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let klass: string = "";

  export { klass as class };
  export let options: GridStackOptions = {};
  export let lock: boolean;

  let grid;

  $: if (grid) {
    if (lock)
      grid.disable();
    else
      grid.enable();
  }

  onMount(() => {
    grid = GridStack.init(options);
    grid.on('change', (e, elements) => {
      dispatch('change', elements);
    });
  })

</script>

<div class="grid-stack {klass}">
  <slot></slot>
</div>

<style lang="scss">
  :global(.ui-resizable-handle) {
    right: 20px !important;
    bottom: 20px !important;
  }
</style>