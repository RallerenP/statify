<script lang="ts">
  import 'gridstack/dist/gridstack.min.css';
  import 'gridstack/dist/jq/gridstack-dd-jqueryui';
  import { GridStack, GridStackOptions } from 'gridstack'; 
  import { onMount, createEventDispatcher, onDestroy, tick } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let klass: string = "";

  export { klass as class };
  export let options: GridStackOptions = {};
  export let lock: boolean;
  export function removeWidget(widget) {
    if (grid) {
      grid.removeWidget(widget, true)
      grid.commit();
    }
      
  }

  export function reset() {
    if (!grid) return;
    grid.destroy(false);
    grid = GridStack.init(options);
  }

  export function compact() {
    if (grid)
      grid.compact();
  }

  let grid;

  $: if (grid) {
    if (lock)
      grid.disable();
    else
      grid.enable();
  }

  onMount(async () => {
    grid = GridStack.init(options);
    grid.on('change', (e, elements) => {
      dispatch('change', elements);
    });
    
    await tick();
    dispatch('done');
  })

  let render = true;

  onDestroy(async () => {
    render = false;
    await tick();
    grid.destroy(false);
  })

</script>

<div class="grid-stack {klass}">
  {#if render}
    <slot></slot>
  {/if}
</div>

<style lang="scss">
  :global(.ui-resizable-handle) {
    right: 20px !important;
    bottom: 20px !important;
  }
</style>