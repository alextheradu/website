<script>
    import { onMount } from 'svelte';
    export let data;
    let isActive = !!data.bool;

    onMount(() => {
        isActive = !!data.bool; // Ensure correct color on client load
    });

    async function toggleBool() {
        fetch ('/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        });
    }
</script>
<style>
    input[type="checkbox"] {
        display: none;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(145deg, #ccc, #e0e0e0); /* Light mode gradient */
        transition: background 0.4s, box-shadow 0.4s;
        border-radius: 34px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        height: 80vh;
        width: 80vw;
        margin: auto;
    }

    .slider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: rgba(0, 255, 0, 0.2); /* Default green tint */
        transition: background 0.4s;
        border-radius: 34px;
    }

    input[type="checkbox"]:checked + .slider::before {
        background: rgba(0, 255, 0, 0.2); /* Green when active */
    }

    input[type="checkbox"]:not(:checked) + .slider::before {
        background: rgba(255, 0, 0, 0.2); /* Red when inactive */
    }
</style>
<label class="switch" aria-label="Toggle Dark Mode">
    <input
        type="checkbox"
        bind:checked={isActive}
        on:click={toggleBool}
    />
    <span class="slider"></span>
</label>