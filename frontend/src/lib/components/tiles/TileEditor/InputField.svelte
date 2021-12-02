<script lang="ts">
    let klass = '';

    export { klass as class }
    export let value;
    export let disabled

</script>

<label class="input-group w-[90%] rounded-box {klass}">
    <span class="bg-primary w-[125px] text-primary-content"><slot></slot></span> 
    <input type="text" {value} on:keyup={ (e) => value = e.target.value } on:keydown|stopPropagation class="input input-bordered w-full" {disabled}>
</label>