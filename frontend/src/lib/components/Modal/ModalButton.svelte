<script lang="ts">
  // import { createEventDispatcher } 

  let klass = '';

  export { klass as class }
  export let type: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' = 'neutral';

</script>

<button on:click class="btn mx-1 { type === 'primary' && 'btn-primary' } { type === 'secondary' && 'btn-primary' } { type === 'accent' && 'btn-accent' } { type === 'ghost' && 'btn-ghost' } { type === 'link' && 'btn-link' } { klass }">
  <slot></slot>
</button>