<script>
    import Button from "./Button.svelte";
    export let menuItems = null;

    let isOpen = false;
    let triggerRef, contentRef;
</script>

<svelte:window
    on:click={(e) => {
        const ccc = triggerRef.contains(e.target) || contentRef.contains(e.target);
        /* console.log('CLICK', ccc); */
        if (!ccc) isOpen = false;
    }}
/>

<div class="dropdown" class:is-active={isOpen}>
    <div class="dropdown-trigger">
        <div
            bind:this={triggerRef}
            on:click={() => {
                isOpen = !isOpen;
            }}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
        >

            <slot name="trigger">
                <Button color="inherit" icon="mdi-dots-vertical" />
            </slot>
        </div>
    </div>
    <div class="background" />
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div bind:this={contentRef} class="dropdown-content">

            {#if menuItems}
                {#each menuItems as item}
                    {#if item.type === 'a'}
                        <Button
                            color="inherit"
                            to={item.href}
                            target={item.target || null}
                        >
                            {item.content}
                        </Button>
                    {:else if item.type === 'hr'}
                        <hr class="dropdown-divider" />
                    {:else if item.type === 'button'}
                        <Button
                            color="inherit"
                            on:click={item.onClick}
                            class="inherit dropdown-item"
                        >
                            {item.content}
                        </Button>
                    {/if}
                {/each}
            {:else}
                <slot />
            {/if}

        </div>
    </div>
</div>

<style>
    .dropdown {
        display: inline-flex;
        position: relative;
        vertical-align: top;
    }

    :global(.dropdown-item) {
        color: #4a4a4a;
        display: block;
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 0.375rem 1rem;
        position: relative;
    }

    .dropdown-menu {
        display: none;
        right: 0;
        min-width: 12rem;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        z-index: 20;
    }

    .dropdown.is-active .dropdown-menu,
    .dropdown.is-hoverable:hover .dropdown-menu {
        display: block;
    }

    .dropdown-content {
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
            0 0px 0 1px rgba(10, 10, 10, 0.02);
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
    }

    .dropdown-divider {
        background-color: #ededed;
        border: none;
        display: block;
        height: 1px;
        margin: 0.5rem 0;
    }

    .background {
        display: none;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        position: fixed;
        background-color: hsla(0, 0%, 4%, 0.86);
        z-index: 40;
        cursor: pointer;
    }

    @media screen and (max-width: 1023px) {
        .is-active .background {
            display: block;
        }
        .dropdown-menu {
            position: fixed !important;
            width: calc(100vw - 40px);
            max-width: 600px;
            max-height: calc(100vh - 120px);
            top: 25% !important;
            left: 50% !important;
            bottom: auto !important;
            right: auto !important;
            transform: translate3d(-50%, -25%, 0);
            white-space: normal;
            overflow-y: auto;
            z-index: 50 !important;
        }
    }
</style>
