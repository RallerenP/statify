<script lang="ts">
  let klass = '';

  export { klass as class };
  export let open = false;

  $: console.log(open)

</script>

<div class="modal { open ? 'modal-open' : '' }">
  <div class="modal-box { klass }">
    <slot></slot>
  </div>
</div>
