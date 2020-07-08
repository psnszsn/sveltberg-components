<script>
    import DropdownMenu from "../DropdownMenu.svelte";
</script>

<nav class="topbar" role="navigation" aria-label="main navigation">

    <div class="side">
        <div class="left">
            <slot name="left" />
        </div>
    </div>

    <div class="center">
        <slot name="center">
            <span class="title">
                sveltberg
                <b>components</b>
            </span>
        </slot>
    </div>

    <div class="side">
        <div class="right">
            <slot name="right" />
        </div>
    </div>
</nav>

<style>
    .left {
        margin-right: auto;
    }
    .center {
        margin-left: auto;
        margin-right: auto;
    }
    .right {
        margin-left: auto;
    }

    .side {
        display: flex;
        flex-basis: 100%;
        align-items: center;
        flex-grow: 1;
        width: 100%;
    }
    .topbar {
        background-color: #f5f5f5f5;
        min-height: 3.25rem;
        position: relative;
        z-index: 29;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        transition: top 0.3s;
    }

    .center > :global(*) {
        font-size: 1.5rem;
        font-weight: 500;
        margin: auto;
        white-space: nowrap;
        /* user-select: none; */
    }
    .topbar > :global(* b) {
        font-weight: 300;
    }
</style>
