<script>
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";

    const themes = [
        { label: "🌝 light", theme_name: "light" },
        { label: "🌚 dark", theme_name: "dark" },
        { label: "🧁 cupcake", theme_name: "cupcake" },
        { label: "🐝 bumblebee", theme_name: "bumblebee" },
        { label: "✳️ emerald", theme_name: "emerald" },
        { label: "🏢 corporate", theme_name: "corporate" },
        { label: "🌃 synthwave", theme_name: "synthwave" },
        { label: "👴 retro", theme_name: "retro" },
        { label: "🤖 cyberpunk", theme_name: "cyberpunk" },
        { label: "🌸 valentine", theme_name: "valentine" },
        { label: "🎃 halloween", theme_name: "halloween" },
        { label: "🌷 garden", theme_name: "garden" },
        { label: "🌲 forest", theme_name: "forest" },
        { label: "🐟 aqua", theme_name: "aqua" },
        { label: "👓 lofi", theme_name: "lofi" },
        { label: "🖍 pastel", theme_name: "pastel" },
        { label: "🧚‍♀️ fantasy", theme_name: "fantasy" },
        { label: "📝 wireframe", theme_name: "wireframe" },
        { label: "🏴 black", theme_name: "black" },
        { label: "💎 luxury", theme_name: "luxury" },
        { label: "🧛‍♂️ dracula", theme_name: "dracula" },
        { label: "🖨 cmyk", theme_name: "cmyk"}
    ]
    
    onMount(() => {
        themeChange(false);
    });
</script>

<div class="dropdown dropdown-end">
    <div tabindex="0" class="btn btn-ghost normal-case text-base-content">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg> 
        &nbsp;Switch Theme
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-4 h-4 ml-1 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    </div>
    <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-200 text-base-content rounded-box w-52 max-h-72 overflow-y-scroll">
        {#each themes as theme}
            <li>
                <a data-set-theme="{theme.theme_name}" class="capitalize" >{theme.label}</a>
            </li>
        {/each}
    </ul>
</div>