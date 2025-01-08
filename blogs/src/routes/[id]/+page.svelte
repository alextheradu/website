<script>
    let { data } = $props();
</script>
<div class="container">
    <!-- Navigation Buttons -->
    <div class="nav-buttons">
        <button class="btn" on:click={() => window.location.href='https://alexradu.co/blog'}>Back</button>
        <button class="btn" on:click={() => window.location.href='https://alexradu.co'}>Home</button>
    </div>
</div>    

<div class="main-content">
    <h1>{data.blog.title}</h1>
    <h3>{data.blog.body}</h3>
</div>

<style>
    @import '../../../../static/style.css';

    .nav-buttons {
        margin-top: 10px; /* Add margin to move the button lower */
        margin-left: 10px;
        position: relative;
        z-index: 1; /* Ensure the button is on top */
    }

    .main-content {
        margin-top: -15%; /* Adjust margin to move the content higher */
        padding-top: 0;
    }
    h3 {
        font-size: 20px;
    }
</style>
