<script>
    import Icon from "./Icon.svelte";
    export let isLoading = false,
        isActive = false,
        isFreeForm = false,
        isSmall = false,
        disabled = false,
        noActiveFilter = false,
        type = "button",
        form = null,
        color = "",
        icon = null,
        to = null,
        rel = "noopener noreferrer",
        target = null,
        width = null;
</script>

{#if to}
    <a
        href={to}
        {rel}
        {target}
        class="button"
        class:is-primary={color === 'primary'}
        class:inherit={color === 'inherit'}
        class:is-light={color === 'light'}
        class:is-loading={isLoading}
        class:no-active={noActiveFilter}
        class:free-form={isFreeForm}
        class:is-small={isSmall}
    >
        <slot />
    </a>
{:else}
    <button
        {type}
        {form}
        {disabled}
        on:click
        class:is-active={isActive}
        class:is-primary={color === 'primary'}
        class:inherit={color === 'inherit'}
        class:is-light={color === 'light'}
        class:is-loading={isLoading}
        class:no-active={noActiveFilter}
        class:free-form={isFreeForm}
        class:is-small={isSmall}
        style={width && `--width: ${width}`}
        aria-controls={$$props['aria-controls']}
        aria-label={$$props['aria-label']}
        aria-expanded={$$props['aria-expanded']}
    >

        {#if icon}
            <Icon name={icon} />
        {/if}
        <slot />
        {#if isLoading}
            <div class="loader" />
        {/if}
    </button>
{/if}

<style>
    button,
    a.button {
        -moz-appearance: none;
        -webkit-appearance: none;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 4px;
        box-shadow: none;
        display: inline-flex;
        font-size: 1rem;
        height: 2.5em;
        justify-content: flex-start;
        line-height: 1.5;
        position: relative;
        vertical-align: top;
    }

    button,
    a.button {
        background-color: #fff;
        border-color: #dbdbdb;
        border-width: 1px;
        color: #363636;
        cursor: pointer;
        justify-content: center;
        padding-bottom: calc(0.5em - 1px);
        padding-left: 1em;
        padding-right: 1em;
        padding-top: calc(0.5em - 1px);
        text-align: center;
        white-space: nowrap;
        --width: inital;
        width: var(--width);
    }

    .is-primary {
        background-color: var(--primary-color);
        border-color: transparent;
        color: #fff;
    }

    .is-light {
        background-color: whitesmoke;
        border-color: transparent;
        color: rgba(0, 0, 0, 0.7);
        border-color: #dbdbdb;
        border-width: 1px;
    }

    .inherit {
        border-color: transparent !important;
        background-color: inherit;
        border: none;
        color: inherit;
    }
    .inherit:hover {
        background-color: rgba(1, 1, 1, 0.1);
    }

    button:hover,
    a.button:hover {
        filter: brightness(96%);
    }

    button:active,
    a.button:active {
        filter: brightness(85%);
    }

    button.no-active:active,
    a.button.no-active:active {
        filter: brightness(96%);
    }

    button:focus,
    a.button:focus {
        outline: none;
    }

    :global(.dropdown-content) > button,
    :global(.dropdown-content) > a.button {
        color: #4a4a4a;
        padding-right: 3rem;
        text-align: left;
        white-space: nowrap;
        width: 100%;
        padding: 0.375rem 1rem;
        font-size: 0.875rem;
        display: block;
    }

    button[disabled],
    :global(fieldset[disabled]) button {
        cursor: not-allowed;
        box-shadow: none;
        opacity: 0.5;
        pointer-events: none;
    }

    button.is-loading {
        color: transparent !important;
        pointer-events: none;
    }

    button.is-small {
        border-radius: 2px;
        font-size: 0.75rem;
    }

    button {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    button .loader {
        position: absolute;
        left: calc(50% - (1em / 2));
        top: calc(50% - (1em / 2));
        position: absolute !important;
    }

    .free-form {
        padding: 0 !important;
        height: unset;
        border-radius: 0;
    }
    button :global(svg) {
        color: inherit;
    }

    button :global(svg):first-child:last-child {
        margin-left: calc(-0.5em - 1px);
        margin-right: calc(-0.5em - 1px);
    }

    button :global(svg):first-child:not(:last-child) {
        margin-left: calc(-0.25em - 1px);
        margin-right: 0.25em;
    }
</style>
