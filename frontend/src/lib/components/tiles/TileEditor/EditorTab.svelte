<script lang='ts'>
import type { TileContentDTO } from "../../../api/dtos/TileDTOs";


  let klass = '';

  export { klass as class };
  export let tab: TileContentDTO;
  export let active: boolean = false;
</script>

<a on:click class="tab tab-bordered { active ? 'tab-active' : '' }">
  {tab.label}
</a>