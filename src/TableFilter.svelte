<script>
    import { createEventDispatcher, tick } from "svelte";
    import FormField from "./FormField.svelte";
    import { default as Filter, getAllFns } from "./Filter.svelte";
    import HorizontalField from "./HorizontalField.svelte";
    import Select from "./form/Select.svelte";
    import { pipe } from "./utils.js";
    export let list = [];
    export let selectors = [];

    $: if (selectors.length === 0 && list.length > 1) {
        selectors = generateSelectors(list[0]);
    }

    const dispatch = createEventDispatcher();

    /* let filters = []; */

    let noOfFilters = 0;

    /* function dispatchFilters() { */
    /*     dispatch("filter", { fn: pipe(...filters.map((filter) => filter.fn)) }); */
    /* } */

    /* function addFilter(selectorStr) { */
    /*     let sel = selectors.find( */
    /*         (s) => !filters.find((f) => f.selector === s.selector) */
    /*     ); */
    /*     filters = [...filters, new Filter(sel.type, sel.selector, "contains")]; */
    /* } */

    function generateSelectors(obj) {
        let options = [];
        for (const property in obj) {
            if (Array.isArray(obj[property])) continue;

            if (
                ["boolean", "string", "number"].includes(typeof obj[property])
            ) {
                options.push({
                    label: property,
                    selector: property,
                    type: typeof obj[property],
                });
            } else if (obj[property] instanceof Date && !isNaN(obj[property])) {
                options.push({
                    label: property + "date",
                    selector: property,
                    type: "date",
                });
            } else if (typeof obj[property === "object"]) {
                options.push(
                    ...generateSelectors(obj[property]).map((x) => ({
                        ...x,
                        selector: `${property}.${x.selector}`,
                    }))
                );
            }
        }
        /* console.log(JSON.stringify(options)); */
        return options;
    }
</script>

<div class="filters">

    {#each { length: noOfFilters } as _, i}
        <Filter
            on:filterChange={() => dispatch('filter', { fn: getAllFns() })}
            on:delete={() => {
                noOfFilters = noOfFilters - 1;
                setTimeout(function () {
                    dispatch('filter', { fn: getAllFns() });
                }, 0);
            }}
            isLast={i === noOfFilters - 1}
            {selectors}
        />
    {/each}

    <span
        on:click={() => (noOfFilters = noOfFilters + 1)}
        style=" color: var(--link-color); cursor:pointer "
    >
        Add filter...
    </span>
</div>

<style>
    .filters {
        margin: 1rem;
        width: 30rem;
    }
</style>
