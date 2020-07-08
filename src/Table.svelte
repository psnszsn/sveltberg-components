<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let data = [];
    export let columns = [
        { field: "id", label: "ID" },
        { field: "first_name", label: "First name" },
        { field: "last_name", label: "Last name" },
        { field: "email", label: "Email" },
        { field: "telephone", label: "Telephone" },
    ];

    function handleRowclick(row) {
        dispatch("rowClick", {
            rowData: row,
        });
    }
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                {#each columns as column}
                    <th>{column.label}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if data.length === 0}
                <div class="loader" />
            {:else}
                {#each data as row (row.id || row)}
                    <tr on:click={() => handleRowclick(row)}>
                        {#each columns as column}
                            <td>
                                {#if !column.component}
                                    {!column.formatter ? row[column.field] : column.formatter(row)}
                                {:else}
                                    <svelte:component
                                        this={column.component}
                                        {row}
                                    />
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<style>
    .table-container {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        overflow-y: hidden;
        max-width: 100%;
    }
    table {
        width: 100%;
        background-color: white;
        color: #363636;
        border-collapse: collapse;
        border-spacing: 0;
    }

    thead th {
        border: 1px solid #dbdbdb;
        border-width: 0 0 2px;
        color: #363636;
        padding: 0.5em 0.75em;
        vertical-align: top;
    }

    tbody tr:not(.is-selected):nth-child(even) {
        background-color: #fafafa;
    }

    tbody tr:not(.is-selected):hover {
        background-color: whitesmoke;
    }

    table td {
        border: 1px solid #dbdbdb;
        border-width: 0 0 1px;
        padding: 0.5em 0.75em;
        vertical-align: top;
    }
    tbody tr:last-child td {
        border-bottom-width: 0;
    }
    tbody > tr {
        cursor: pointer;
    }

    .loading {
        background-clip: content-box;
        background-color: rgb(224, 224, 224);
    }
</style>
