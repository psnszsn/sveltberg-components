<script>
    import Button from "../Button.svelte";
    export let drawerActive;
</script>

<Button
    role="button"
    on:click
    color="inherit"
    aria-label="menu"
    aria-expanded={drawerActive}
    noActiveFilter={true}
    isFreeForm={true}
>
    <div class="navbar-burger" class:is-active={drawerActive}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
    </div>
</Button>

<style>
    .navbar-burger {
        height: 3.25rem;
        width: 3.25rem;
    }

    .navbar-burger span {
        background-color: currentColor;
        display: block;
        height: 1px;
        left: calc(50% - 8px);
        position: absolute;
        transform-origin: center;
        transition-duration: 86ms;
        transition-property: background-color, opacity, transform;
        transition-timing-function: ease-out;
        width: 16px;
    }

    .navbar-burger span:nth-child(1) {
        top: calc(50% - 6px);
    }

    .navbar-burger span:nth-child(2) {
        top: calc(50% - 1px);
    }

    .navbar-burger span:nth-child(3) {
        top: calc(50% + 4px);
    }

    .navbar-burger.is-active span:nth-child(1) {
        transform: translateY(5px) rotate(45deg);
    }

    .navbar-burger.is-active span:nth-child(2) {
        opacity: 0;
    }

    .navbar-burger.is-active span:nth-child(3) {
        transform: translateY(-5px) rotate(-45deg);
    }
</style>
