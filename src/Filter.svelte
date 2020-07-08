<script context="module">
    import { pipe } from "./utils.js";
    const elements = new Set();

    window.ell = elements;

    export function getAllFns() {
        return pipe(...[...elements].map((f) => f.fn));
    }

    const getValue = (obj, str) =>
        str.split(".").reduce((a, b) => (a ? a[b] : null), obj);
</script>

<script>
    import { createEventDispatcher, onMount } from "svelte";
    import FormField from "./FormField.svelte";
    import Select from "./form/Select.svelte";

    export let isLast = false;
    export let selectors;
    let sel = selectors.find(
        (s) => ![...elements].find((f) => f.selector === s.selector)
    );

    export let filter = {
        type: sel.type,
        selector: sel.selector,
        predicate: "contains",
        value: "",
    };

    $: filter.fn = function (v) {
        const thisFilter = filter;
        if (thisFilter.type === "date") {
            return v.filter((x) => {
                const value = getValue(x, thisFilter.selector);
                const search = value && value > new Date(thisFilter.value);
                console.log(new Date(thisFilter.value));
                return thisFilter.predicate === "is after" ? search : !search;
            });
        }
        return v.filter((x) => {
            const value = getValue(x, thisFilter.selector);
            const search =
                value &&
                value.toString().toLowerCase().includes(thisFilter.value);
            return thisFilter.predicate === "contains" ? search : !search;
        });
    };

    const { selector, type, predicate, value } = filter;

    const dispatch = createEventDispatcher();

    onMount(() => {
        elements.add(filter);
        return () => elements.delete(filter);
    });

    function handleDelete(e) {
        e.stopPropagation();
        dispatch("delete");
    }

    $: if (filter) dispatch("filterChange", filter);
</script>

<div class="filter">
    <FormField>
        <Select
            on:input={(e) => {
                let sel = selectors.find((s) => s.selector === e.target.value);
                dispatch('change', { selector: sel.selector, type: sel.type });
                filter.selector = sel.selector;
                filter.type = sel.type;
            }}
            isSmall={true}
            value={selector}
            options={selectors.map((x) => ({
                value: x.selector,
                label: x.label,
            }))}
        />
    </FormField>
    <FormField>
        <Select
            bind:value={filter.predicate}
            isSmall={true}
            options={filter.type === 'date' ? ['is after', 'is before'] : ['contains', 'does not contain']}
        />
    </FormField>
    <FormField
        bind:value={filter.value}
        placeholder="banane"
        type={filter.type === 'date' ? 'date' : 'text'}
        size="10"
        isSmall={true}
    />
    {#if isLast}
        <button on:click={handleDelete} class="delete" />
    {/if}
</div>

<style>
    .filter {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1rem;
    }

    .filter :global(div.field) {
        margin-bottom: 0 !important;
    }

    .filter > :global(.field:not(:last-child)) {
        margin-right: 0.75rem;
    }
</style>
