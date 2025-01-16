<script>
    import { onMount } from 'svelte';
    export let data;

    // State to store the dark mode state
    let darkMode = false;

    // Load the saved dark mode preference from localStorage
    onMount(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        darkMode = savedDarkMode === 'enabled';
    });

    // Toggle the dark mode
    function toggleDarkMode() {
        darkMode = !darkMode; // Flip dark mode state
        localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
    }
</script>

<div class={darkMode ? 'body.dark-mode' : 'body.light-mode'}>

    <div class="main-content">
        <h1>Blogs</h1>
        <h3>Welcome to my blogs! I'll try to be conistent here (around 6-7 times a week) posting my progress with some languages and overall life!</h3>
    </div>

    <div class="button-container">
        {#if data?.blogs?.length > 0}
            {#each data.blogs.slice().reverse() as blog}
                <a href="{blog.id}">
                    <button class="btn">{blog.title} ({blog.date})</button>
                </a>
            {/each}
        {:else}
            <p>No blogs available (Database is probably down).</p>
        {/if}
    </div>
</div>

<style>
    @import '../../../static/style.css';

    .main-content {
        margin-top: 75px;
        padding-top: 0;
    }
    h3 {
        font-size: 20px;
    }
    .button-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; /* Adjust gap as needed */
    }
    .btn {
        flex: 1 1 auto; /* Allow buttons to grow and shrink */
    }
</style>
