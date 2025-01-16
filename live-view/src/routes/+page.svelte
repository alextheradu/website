<script>
    import { onMount } from 'svelte';
    import PocketBase from 'pocketbase';
    let isActive = false;

    onMount(async () => {
        const pb = new PocketBase('https://database.alexradu.co');
        try {
            const record = await pb.collection('live_view').getOne('y844g331abe2ugy');
            isActive = record.bool;
            document.body.style.backgroundColor = isActive ? 'green' : 'red';
        } catch (error) {
            console.error(error);
        }
        pb.collection('live_view').subscribe('*', (e) => {
            if (e.record) {
                isActive = e.record.bool;
                document.body.style.backgroundColor = isActive ? 'green' : 'red';
            }
        });
    });
</script>
<style>
    .active {
        background-color: green;
    }
    .inactive {
        background-color: red;
    }
    div {
        font-size: 2em;
    }
    
</style>
