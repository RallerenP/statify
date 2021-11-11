<script lang="ts">
  let klass = "";
  let widget;

  export { klass as class }

  export let width: number = 2; 
  export let height: number = 2;
  export let x: number;
  export let y: number;
  export let id;
  export function getWidget() {
    return widget;
  }
</script>

<div bind:this={widget} data-id={id}  class="grid-stack-item {klass}" gs-w={width} gs-h={height} gs-x={x} gs-y={y}>
  <div class="grid-stack-item-content" >
    <slot></slot>
  </div>
</div>