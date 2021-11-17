<script lang="ts">
    export let value;

</script>

<label class="input-group my-2">
    <span class="bg-primary w-[75px]"><slot></slot></span> 
    <input type="text" {value} on:keyup={ (e) => value = e.target.value } class="input input-bordered w-3/5">
</label>