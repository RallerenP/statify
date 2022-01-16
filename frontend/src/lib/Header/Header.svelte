<script lang="ts">
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import { getContext } from 'svelte';
    import type { Writable } from "svelte/store";
    import { edit, user } from "../../stores/stores";
    import { UserCircle } from "svelte-hero-icons";
    import Icon from 'svelte-hero-icons/Icon.svelte'
    import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
    import { auth } from "../firebase/firebase";

    const provider = new GoogleAuthProvider();

    const handleSignIn = async () => {
        await signInWithPopup(auth, provider)
        window.location.reload();
    }

    const handleSignOut = async () => {
        await signOut(auth);
    }
    
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
        
        {#if $user === undefined }
            <button class="btn btn-primary btn-outline">
                <Icon src={UserCircle} size="24" class="mr-2"></Icon>
                <div class="animate-pulse h-4 rounded inline bg-primary">Log In</div>
            </button>
        {:else if $user === null}
            <button class="btn btn-primary btn-outline" on:click={handleSignIn}>
                <Icon src={UserCircle} size="24" class="mr-2"></Icon>
                Log In
            </button>
        {:else}
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
            <div class="ml-8 dropdown dropdown-end">
                <button class="btn btn-primary btn-outline">
                    <Icon src={UserCircle} size="24" class="mr-2"></Icon>
                    {$user.displayName}
                </button>
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-200 text-base-content rounded-box">
                    <li>
                        <a on:click={handleSignOut} class="capitalize" >Log Out</a>
                    </li>
                </ul>
            </div>
            
        {/if}

    </div>
    
</div>