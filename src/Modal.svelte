<script>
    import Button from "./Button.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    export let isActive = true,
        title = "Modală";
    export let card = true;
    let cardEl;

    const dispatch = createEventDispatcher();
    let isOverflow = false;
    onMount(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            /* console.log(entries[0].contentRect); */
            if (entries[0].contentRect.height > window.innerHeight * 0.9) {
                isOverflow = true;
            } else {
                isOverflow = false;
            }
        });
        resizeObserver.observe(cardEl);
        return () => {
            resizeObserver.unobserve(cardEl);
        };
    });

    function close() {
        isActive = false;
        dispatch("close");
    }
</script>

<div class="modal" class:is-active={isActive}>
    <div on:click={close} class="modal-background" />
    {#if card}
        <div bind:this={cardEl} class="modal-card">
            <header>
                <p class="modal-card-title">{title}</p>
                <button on:click={close} class="delete" aria-label="close" />
            </header>
            <section style="overflow-y: {isOverflow ? 'auto' : 'unset'}">
                <slot />
            </section>
            <footer>
                <slot name="footer">
                    <Button>Save changes</Button>
                    <Button on:click={close}>Cancel</Button>
                </slot>
            </footer>
        </div>
    {:else}
        <div bind:this={cardEl} class="modal-content">
            <slot />
        </div>
    {/if}
</div>

<style>
    .modal,
    .modal-background {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
    }

    .modal.is-active {
        display: flex;
    }
    .modal {
        align-items: center;
        display: none;
        flex-direction: column;
        justify-content: center;
        /* overflow: hidden; */
        position: fixed;
        z-index: 40;
    }

    .modal-background {
        background-color: rgba(10, 10, 10, 0.86);
    }

    .modal-card {
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 40px);
        /* overflow: hidden; */
        /* -ms-overflow-y: visible; */
        margin: 0 20px;
        position: relative;
        width: 640px;
    }

    .modal-content {
        margin: 0 20px;
        max-height: calc(100vh - 160px);
        /* overflow: auto; */
        position: relative;
        width: 640px;
        max-width: calc(100% - 20px);
    }

    .modal-close {
        background: 0 0;
        height: 40px;
        position: fixed;
        right: 20px;
        top: 20px;
        width: 40px;
    }

    @media screen and (max-width: 769px), print {
        .modal-card {
            width: 100%;
        }
    }
    section {
        -webkit-overflow-scrolling: touch;
        background-color: white;
        flex-grow: 1;
        flex-shrink: 1;
        /* overflow-y: scroll; */
        padding: 20px;
    }
    header {
        border-bottom: 1px solid #dbdbdb;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    footer {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top: 1px solid #dbdbdb;
    }

    header,
    footer {
        align-items: center;
        background-color: whitesmoke;
        display: flex;
        flex-shrink: 0;
        justify-content: flex-start;
        padding: 20px;
        position: relative;
    }

    header > p {
        color: #363636;
        flex-grow: 1;
        flex-shrink: 0;
        font-size: 1.5rem;
        line-height: 1;
    }

    footer :global(button:not(:last-child)) {
        margin-right: 0.5em;
    }
</style>
