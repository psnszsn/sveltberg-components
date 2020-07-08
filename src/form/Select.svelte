<script>
    export let id = null;
    export let required = null;
    export let isSmall = false;
    export let value = "";
    export let disabled = false;
    export let defaultOption = false;
    export let options = [];
</script>

<div class:is-small={isSmall} class="select">
    <select {id} {required} {disabled} on:input bind:value>
        {#if defaultOption}
            <option value="assd" disabled selected hidden>Add filter</option>
        {/if}
        {#each options as option}
            <option value={option.value || option}>
                {option.label || option}
            </option>
        {/each}
    </select>
</div>

<style>
    select:invalid {
        color: gray;
    }
    .select {
        width: unset;

        display: inline-block;
        max-width: 100%;
        position: relative;
        vertical-align: top;
    }

    .select select {
        cursor: pointer;
        display: block;
        font-size: 1em;
        max-width: 100%;
        outline: 0;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border: 3px solid transparent;
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: 0.625em;
        margin-top: -0.4375em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
        transform-origin: center;
        width: 0.625em;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #3273dc;
        right: 1.125em;
        z-index: 4;
    }

    .select:not(.is-multiple):not(.is-loading):hover::after {
        border-color: #363636;
    }
    .select select:not([multiple]) {
        padding-right: 2.5em;
    }

    select.is-danger {
        border-color: #f14668;
    }

    .select.is-small {
        border-radius: 2px;
        font-size: 0.75rem;
    }
</style>
