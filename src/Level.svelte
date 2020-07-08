<nav class="level">
    <div class="level-left item-container">
        <slot name="left">
            <div>
                <p class="subtitle is-5">
                    <strong>7</strong>
                    things
                </p>
            </div>
        </slot>
    </div>

    <div class="level-right item-container">
        <slot name="right">
            <span>Etc</span>
            <strong>All</strong>
        </slot>
    </div>
</nav>
{#if false}<slot></slot>{/if}

<style>
    .level {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap:wrap;
    }

    .level :global(img) {
        display: inline-block;
        vertical-align: top;
    }

    .item-container > :global(*):not(:last-child) {
        margin-right: 0.75rem;
    }

    @media screen and (max-width: 768px) {
        .level {
            flex-direction: column;
        }
        .item-container {
            flex-direction: column;
        }
        .item-container > :global(*):not(:last-child) {
            margin-bottom: 0.75rem;
            margin-right: 0px;
        }
        .level-left + .level-right {
            margin-top: 1.5rem;
        }
    }

    .level-left,
    .level-right {
        display: flex;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .level-left {
        align-items: center;
        justify-content: flex-start;
    }

    .level-right {
        align-items: center;
        justify-content: flex-end;
    }

    .item-container > :global(*) {
        align-items: center;
        display: flex;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: center;
    }
</style>

