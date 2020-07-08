<script>
    import FormField from "./FormField.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function sayHello() {
        dispatch("message", {
            text: "Hello!",
        });
    }
    export let data = [],
        field = null,
        id = null,
        placeholder,
        label = null,
        required = false,
        disabled = false;

    export let formatter = i => (typeof i === "string" ? i : i[field]);
    export let value = "";
    let isActive = false;
    let search = value ? formatter(value) : "";
    $: results = data.filter(item =>
        format(item)
            .toUpperCase()
            .includes(search.toUpperCase())
    );
    let selected_id = -1;
    $: if (!isActive) selected_id = -1;

    let pttrn = "";
    $: data.forEach((el, i) => {
        pttrn = pttrn + format(el) + "|";
    });

    function format(item) {
        const a = formatter(item);
        return typeof a === "string" ? a : a.toString();
    }

    function select(i) {
        if (i < 0) {
            search = "";
            value = undefined;
            console.log("selected minus");
        } else {
            search = format(results[i]);
            value = results[i];
        }
        dispatch("change", value);
    }

    function activate() {
        value = undefined;
        isActive = true;
    }

    function doubleclick() {
        select(-1);
        isActive = true;
    }

    function onKeyDown(event) {
        //console.log(event)
        if (isActive) {
            if (
                event.key === "ArrowDown" ||
                (event.key === "Tab" && !event.shiftKey)
            ) {
                event.preventDefault();
                if (selected_id < results.length - 1)
                    selected_id = selected_id + 1;
            } else if (
                event.key === "ArrowUp" ||
                (event.key === "Tab" && event.shiftKey)
            ) {
                event.preventDefault();
                if (selected_id > 0) selected_id = selected_id - 1;
            } else if (event.key === "Enter") {
                event.preventDefault();
                if (selected_id === -1) {
                    selected_id = 0;
                }
                isActive = false;
                select(selected_id);
            } else if (event.key === "Escape") {
                event.preventDefault();
                isActive = false;
            }
        }
    }

    const hasHeader = $$props.$$slots && $$props.$$slots.header;
</script>

<svelte:window on:click={() => (isActive = false)} />

<FormField
    {id}
    type="text"
    {placeholder}
    {required}
    {disabled}
    {label}
    autocomplete="off"
    bind:value={search}
    on:keydown={onKeyDown}
    on:reset={() => select(-1)}
    on:input={activate}
    on:dblclick={doubleclick}
>

    <div slot="dropdown" class="dropdown-menu">
        {#if isActive && (results.length > 0 || hasHeader)}
            <div class="dropdown-content">
                {#if hasHeader}
                    <div class="dropdown-item no-hover">
                        <slot name="header" />
                    </div>
                {/if}
                {#each results as item, i}
                    <div
                        on:click={() => select(i)}
                        class="dropdown-item is-hovered"
                        class:is-active={i === selected_id}
                    >
                        <slot name="item" {item}>{format(item)}</slot>
                    </div>
                {/each}
                {#if results.length === 0 }
                    <div class="dropdown-item is-disabled">
                        No results found.
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</FormField>

<style>
    .dropdown-menu {
        right: 0;
        min-width: 12rem;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        z-index: 200;

        display: block;
        min-width: 100%;
        max-width: 100%;
    }

    .dropdown-menu.is-opened-top {
        top: auto;
        bottom: 100%;
    }

    .dropdown-content {
        overflow: auto;
        max-height: 200px;

        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1),
            0 0 0 1px hsla(0, 0%, 4%, 0.1);
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
    }

    .dropdown-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dropdown-item:hover {
        background: #cccccc;
        color: #0a0a0a;
    }

    .dropdown-item.no-hover {
        background: unset;
        color: unset;
    }


    .dropdown-item.is-active {
        background-color: #3273dc;
        color: #fff;
    }

    .dropdown-item.is-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
