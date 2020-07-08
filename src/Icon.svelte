<script>
    export let name = "iso";
    export let size = "";
    export let color = "";

    $: style =
        size || color
            ? `width: ${size}; height: ${size}; color: ${color};`
            : null;
</script>

<svg {style} class:is-fa={name.startsWith('fa')}>
    <use href="/icons.svg#{name}" />
</svg>

<style>
    svg {
        fill: currentColor;
        width: 1.3em;
        height: 1.3em;
        /* margin-left: calc(-0.5em - 1px); */
        /* margin-right: calc(-0.5em - 1px); */
    }

    svg.is-fa {
        /* width: 1.125em; */
        overflow: visible;
        width: 1em;
        height: 1em;
        vertical-align: -0.125em;
    }
</style>
