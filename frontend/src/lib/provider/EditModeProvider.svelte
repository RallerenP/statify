<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  setContext('EDIT_MODE', writable(false));
</script>

<slot />