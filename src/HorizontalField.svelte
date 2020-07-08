<script>
    import FormField from "./FormField.svelte";
    export let label = "";
</script>

<div class="field is-horizontal">
    <div class="is-top field-label is-normal">
        <label class="label">{label}</label>
    </div>
    <div class="field-body">
        <slot>
            <FormField
                id="name"
                placeholder="Gigu"
                type="text"
                isExpanded={true}
                iconLeft="mdi-email"
            />

            <FormField
                id="name"
                placeholder="Gigu"
                type="text"
                isExpanded={true}
                iconLeft="mdi-email"
            />
        </slot>
    </div>
</div>

<style>
    .label {
        color: #363636;
        display: block;
        font-size: 1rem;
        font-weight: 700;
    }
    .label:not(:last-child) {
        margin-bottom: 0.5em;
    }

    .field:not(:last-child) {
        margin-bottom: 0.75rem;
    }

    @media screen and (max-width: 768px) {
        .field-label {
            margin-bottom: 0.5rem;
        }
    }



    @media screen and (min-width: 769px), print {
        .field-label {
            flex-basis: 0;
            flex-grow: 1;
            flex-shrink: 0;
            margin-right: 1.5rem;
            text-align: right;
            /* padding-top: 0.375em; */
        }
        .field.is-horizontal {
            display: flex;
            align-items: center;
        }
        .field-body {
            display: flex;
            flex-basis: 0;
            flex-grow: 5;
            flex-shrink: 1;
            align-items: center;
        }
        .field-body > :global(.field:not(:last-child)) {
            margin-right: 0.75rem;
        }
        .field-body > :global(.field:not(.is-narrow)) {
            flex-grow: 1;
        }
        .field-body > :global(.field) {
            flex-shrink: 1;
        }
        .field-body :global(div.field) {
            margin-bottom: 0 !important;
        }
    }
</style>
