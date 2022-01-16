<script lang="ts">
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import { getContext } from 'svelte';
    import type { Writable } from "svelte/store";
    import { edit } from "../../stores/stores";
    import { UserCircle } from "svelte-hero-icons";
    import Icon from 'svelte-hero-icons/Icon.svelte'
    import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
    
</script>
    
<div class="navbar w-full border-b border-base-300 bg-base-200 text-neutral-content h-[64px] flex-shrink-0">
    <div class="mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-3xl text-base-content font-bold flex justify-center items-center">
            
            Statify
        </span>
    </div>
    <div class="flex-grow"></div>
    <div>
        <ThemeSwitcher />
        <div class="flex mx-2">
            <label class="justify-center flex ">
                <div class="tooltip tooltip-bottom" data-tip="Toggle Edit Mode">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 {!$edit ? ' text-base-300 ' : 'text-base-content' } mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                    <input id="edit-toggle" type="checkbox" checked={$edit} class="toggle" on:change={() => $edit = !$edit}>
                
            </label>
        </div>
    </div>
</div>