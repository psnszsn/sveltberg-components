<script> 
    export let image = "https://www.gravatar.com/avatar/a829a7504ab16b025f776c9b04977450?d=robohash" 
    
</script>
<div class="avatar">
    <img
        alt="avatar"
        src={image}
    />
</div>

<style>
    .avatar {
        /* margin: 0 0.75rem; */
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background-color: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    img[alt="avatar"] {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>
