<script lang="ts">

export let content

</script>

<div class="flex-center flex-grow h-full flex-col">
  <div class="stat-value">
    {content.label.toUpperCase()}
  </div>
  <div class="stat-desc">
    {content.description}
  </div>
</div>