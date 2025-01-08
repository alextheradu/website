<script>
    import { onMount } from 'svelte';
    export let data;
</script>

    <div class="main-content">
        <h1>Redirects</h1>
    </div>

    <div class="button-container">
        {#if data?.redirect?.length > 0}
            {#each data.redirect as redirect}
                <a href="{redirect.id}">
                    <button class="btn">{redirect.title}</button>
                </a>
            {/each}
        {:else}
            <p></p>
        {/if}
    </div>

<style>
    @import '../../../static/style.css';

    .main-content {
        margin-top: 75px;
        padding-top: 0;
    }
    .button-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; /* Adjust gap as needed */
        margin-bottom: 40vh;
    }
    .btn {
        flex: 1 1 auto; /* Allow buttons to grow and shrink */
    }
</style>
