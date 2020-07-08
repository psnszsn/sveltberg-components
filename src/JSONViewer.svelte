<script>
    import { isObject } from "./utils.js";
    export let obj;
    export let name = "Object";
    export let open = true;
</script>

<details {open}>
    <summary>{name}</summary>
    <ul>
        {#each Object.entries(obj || {}) as e}
            {#if ['string', 'number', 'boolean'].includes(typeof e[1])}
                <li>{e[0]}: {e[1]}</li>
            {:else if isObject(obj)}
                <svelte:self obj={e[1]} name={e[0]} open={false} />
            {/if}
        {/each}
    </ul>
</details>

<style>
    ul {
        margin-left: 25px;
    }
</style>
