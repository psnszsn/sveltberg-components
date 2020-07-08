<script>
    import Icon from "./Icon.svelte";
    export let type = "text";
    export let required = false,
        placeholder = null,
        isError = false,
        pattern = null,
        value = "",
        id = null,
        size = null,
        minlength = null,
        autocomplete = null;
    export let iconLeft = null,
        iconRight = null,
        isExpanded = false,
        isSmall = false,
        disabled = false,
        label = null,
        message = null;
    export let options = [],
        noOption = false,
        formatter = null,
        checked = [];

    $: if (type === "checkbox" && formatter) {
        value = formatter(checked);
    }

    $: if (!$$props.iconRight)
        iconRight = isError ? "fa-exclamation-triangle" : null;

    const hasAddon = $$props.$$slots && $$props.$$slots.addon;
    const hasSlot = $$props.$$slots && $$props.$$slots.default;
    /* console.log($$props) */
</script>

<div class="field" class:has-addons={hasAddon}>
    {#if label}
        <label for={id} class="label">{label}</label>
    {/if}
    <div
        class="control"
        class:has-icons-left={iconLeft}
        class:has-icons-right={iconRight || isError}
        class:is-expanded={isExpanded}
    >
        {#if !hasSlot}
            {#if type === 'textarea'}
                <textarea
                    {id}
                    {placeholder}
                    class:is-danger={isError}
                    bind:value
                />
            {:else if type === 'text'}
                <input
                    class:is-danger={isError}
                    class:is-small={isSmall}
                    on:keyup
                    on:keydown
                    on:reset
                    on:input
                    on:dblclick
                    type="text"
                    {required}
                    {placeholder}
                    {pattern}
                    {disabled}
                    bind:value
                    {id}
                    {minlength}
                    {autocomplete}
                    {size}
                />
            {:else if type === 'number'}
                <input
                    class:is-danger={isError}
                    on:keyup
                    type="number"
                    bind:value
                    {required}
                    {placeholder}
                    {id}
                    {minlength}
                    {autocomplete}
                    min={$$props.min}
                    max={$$props.max}
                />
            {:else if type === 'email'}
                <input
                    class:is-danger={isError}
                    on:keyup
                    type="email"
                    bind:value
                    {required}
                    {placeholder}
                    {id}
                    {minlength}
                    {autocomplete}
                />
            {:else if type === 'password'}
                <input
                    class:is-danger={isError}
                    on:keyup
                    type="password"
                    {required}
                    {placeholder}
                    {pattern}
                    bind:value
                    {id}
                    {minlength}
                    {autocomplete}
                />
            {:else if type === 'date'}
                <input
                    class:is-danger={isError}
                    class:is-small={isSmall}
                    on:keyup
                    on:input
                    type="date"
                    bind:value
                    {required}
                    {id}
                />
            {:else if type === 'tel'}
                <input
                    class:is-danger={isError}
                    on:keyup
                    type="tel"
                    {required}
                    {placeholder}
                    {pattern}
                    bind:value
                    {id}
                    {minlength}
                    {autocomplete}
                />
            {:else if type === 'select'}
                <div class:is-small={isSmall} class="select">
                    <select {disabled} {placeholder} on:input bind:value>
                        {#if noOption}
                            <option value="assd" disabled selected hidden>
                                Add filter
                            </option>
                        {/if}
                        {#each options as option}
                            <option value={option.value || option}>
                                {option.label || option}
                            </option>
                        {/each}
                    </select>
                </div>
            {:else if type === 'checkbox'}
                {#each options as option, i}
                    <label class="checkbox">
                        <input bind:checked={checked[i]} type="checkbox" />
                        {option.label}
                    </label>
                {/each}
            {/if}
        {:else}
            <slot/>
        {/if}
        <slot name="dropdown" />
        {#if iconLeft}
            <span class="icon is-small is-left">
                <Icon name={iconLeft} />
            </span>
        {/if}
        {#if iconRight}
            <span class="icon is-small is-right">
                <Icon name={iconRight} />
            </span>
        {/if}
    </div>
    {#if hasAddon}
        <p class="control">
            <slot name="addon" />
        </p>
    {/if}
    {#if message}
        <p class="help" class:is-danger={isError}>{message}</p>
    {/if}
</div>

<style>

    input:not([type="checkbox"]),
    :global(.select select),
    .control :global(textarea) {
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
        padding-bottom: calc(0.5em - 1px);
        padding-left: calc(0.75em - 1px);
        padding-right: calc(0.75em - 1px);
        padding-top: calc(0.5em - 1px);
        position: relative;
        vertical-align: top;
    }

    input:not([type="checkbox"]),
    :global(.select select),
    .control :global(textarea) {
        background-color: #fff;
        border-color: #dbdbdb;
        border-radius: 4px;
        color: #363636;
    }

    input:not([type="checkbox"]),
    .control :global(textarea) {
        box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
        max-width: 100%;
        width: 100%;
    }

    .control :global(textarea:not([rows])) {
        max-height: 40em;
        min-height: 8em;
    }




    .checkbox,
    .radio {
        cursor: pointer;
        display: inline-block;
        line-height: 1.25;
        position: relative;
    }

    .checkbox input,
    .radio input {
        cursor: pointer;
    }

    .control :global(input[type="checkbox"]),
    .control :global(input[type="radio"]) {
        vertical-align: baseline;
    }

    label.checkbox {
        margin-right: 0.5em;
    }

    textarea {
        display: block;
        max-width: 100%;
        min-width: 100%;
        padding: calc(0.75em - 1px);
        resize: vertical;
    }
    input::placeholder,
    select select::placeholder,
    textarea::placeholder {
        color: rgba(54, 54, 54, 0.3);
    }
    input:hover,
    select:hover,
    textarea:hover {
        border-color: #b5b5b5;
    }

    input:hover,
    select:hover,
    textarea:hover {
        border-color: #b5b5b5;
    }

    input:focus,
    input:active,
    select:focus,
    select:active,
    textarea:focus,
    textarea:active {
        border-color: #3273dc;
        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
        outline: 0;
    }
    input.is-danger{
        border-color: #f14668;
    }

    .help.is-danger {
        color: #f14668;
    }

    .help.is-info {
        color: #3298dc;
    }

    .help {
        display: block;
        font-size: 0.75rem;
        margin-top: 0.25rem;
    }

    .control {
        box-sizing: border-box;
        clear: both;
        font-size: 1rem;
        position: relative;
        text-align: left;
    }

    .control.has-icons-left .icon,
    .control.has-icons-right .icon {
        color: #dbdbdb;
        height: 2.5em;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 2.5em;
        z-index: 4;
    }

    .control.has-icons-left .icon.is-left {
        left: 0;
    }
    .control.has-icons-right .icon.is-right {
        right: 0;
    }

    .control.has-icons-left .input:focus ~ .icon,
    .control.has-icons-left .select:focus ~ .icon,
    .control.has-icons-right .input:focus ~ .icon,
    .control.has-icons-right .select:focus ~ .icon {
        color: #4a4a4a;
    }

    .icon {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    }

    .control.has-icons-left input,
    .control.has-icons-left .select select {
        padding-left: 2.5em;
    }

    .control.has-icons-right input,
    .control.has-icons-right .select select {
        padding-right: 2.5em;
    }

    .control.has-icons-left input:focus ~ .icon,
    .control.has-icons-left select:focus ~ .icon,
    .control.has-icons-right input:focus ~ .icon,
    .control.has-icons-right select:focus ~ .icon {
        color: #4a4a4a;
    }

    :global(.label:not(:last-child)) {
        margin-bottom: 0.5em;
    }

    :global(.field:not(:last-child)) {
        margin-bottom: 0.75rem;
    }

    :global(.label) {
        color: #363636;
        display: block;
        font-size: 1rem;
        font-weight: 700;
    }
    .field.has-addons {
        display: flex;
        justify-content: flex-start;
    }
    .field.has-addons .control.is-expanded {
        flex-grow: 1;
        flex-shrink: 1;
    }

    .field.has-addons .control:not(:last-child) {
        margin-right: -1px;
    }

    .field.has-addons .control:last-child:not(:only-child) :global(button),
    .field.has-addons .control:last-child:not(:only-child) input,
    .field.has-addons .control:last-child:not(:only-child) .select select {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    .field.has-addons .control:first-child:not(:only-child) :global(button),
    .field.has-addons .control:first-child:not(:only-child) input,
    .field.has-addons .control:first-child:not(:only-child) .select select {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }

    input.is-danger,
    textarea.is-danger {
        border-color: #f14668;
    }

    input.is-danger:active,
    input.is-danger:focus,
    textarea.is-danger:active,
    textarea.is-danger:focus {
        box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
    }

    .field.is-grouped {
        display: flex;
        justify-content: flex-start;
    }
    .field.is-grouped > .control:not(:last-child) {
        margin-bottom: 0;
        margin-right: 0.75rem;
    }

    :global(fieldset) {
        border: none;
    }

    input[disabled],
    select[disabled],
    :global(fieldset[disabled]) input,
    :global(fieldset[disabled]) select {
        background-color: whitesmoke;
        border-color: whitesmoke;
        box-shadow: none;
        color: #7a7a7a;
        cursor: not-allowed;
    }

    input.is-small,
    .select.is-small,
    textarea.is-small {
        border-radius: 2px;
        font-size: 0.75rem;
    }
</style>
