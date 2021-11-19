<script lang="ts">
    let klass = '';

    export { klass as class }
    export let value;

</script>

<label class="input-group rounded-box {klass}">
    <span class="bg-primary w-[125px] text-primary-content"><slot></slot></span> 
    <input type="text" {value} on:keyup={ (e) => value = e.target.value } class="input input-bordered w-3/5">
</label>