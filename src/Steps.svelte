<script>
    import Icon from "./Icon.svelte";
    export let data = [
        {
            icon: "mdi-flask-outline",
            color: "red",
            completed: true,
            title: "Developare",
            desc: "Aceasta este o descriere",
        },
        {
            icon: "mdi-scanner",
            color: "red",
            completed: true,
            title: "Scanare",
            desc: "Aceasta este o descriere",
        },
        {
            icon: "mdi-scissors-cutting",
            color: "red",
            completed: false,
            title: "Tăiere",
            desc: "Aceasta este o descriere",
        },
    ];
</script>

<div class="steps is-small">
    {#each data as step}
        {#if step}
            <div
                class:is-completed={step.completed}
                class="step-item is-success"
            >
                <div class="step-marker">
                    <Icon size="1em" color="inherit" name={step.icon} />
                </div>
                <div class="step-details">
                    <p class="step-title">{step.title}</p>
                    {#if step.desc}
                        <p>{step.desc}</p>
                    {/if}
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>
    .steps:not(:last-child) {
        margin-bottom: 1.5rem;
    }
    .steps {
        display: flex;
        flex-wrap: wrap;
        font-size: 1rem;
        min-height: 2rem;
    }
    .steps .step-item {
        --step-color: #00d1b2;
        margin-top: 0;
        position: relative;
        flex-grow: 1;
        flex-basis: 0;
    }
    .is-success {
        --step-color: #23d160 !important;
    }
    .steps .step-item:not(:first-child) {
        flex-basis: 1em;
        flex-grow: 1;
        flex-shrink: 1;
    }
    .steps .step-item:not(:first-child)::before {
        content: " ";
        display: block;
        position: absolute;
    }
    .steps .step-item::before {
        background: linear-gradient(
            to left,
            #dbdbdb 50%,
            var(--step-color) 50%
        );
        background-size: 200% 100%;
        background-position: right bottom;
    }
    .steps .step-item::before .step-marker {
        color: #fff;
    }
    .steps .step-item.is-completed::before {
        background-position: left bottom;
    }
    .steps .step-item.is-completed .step-marker {
        color: #fff;
        background-color: var(--step-color);
    }
    .steps .step-item .step-marker {
        align-items: center;
        display: flex;
        border-radius: 50%;
        font-weight: 700;
        justify-content: center;
        background: #b5b5b5;
        color: #fff;
        border: 0.2em solid #fff;
        z-index: 1;
    }
    .steps .step-item .step-details {
        text-align: center;
    }
    .steps .step-item:not(:first-child)::before {
        height: 0.2em;
        width: 100%;
        bottom: 0;
        left: -50%;
        top: 1rem;
    }
    .steps .step-item .step-marker {
        height: 2rem;
        width: 2rem;
        position: absolute;
        left: calc(50% - 1rem);
    }
    .steps .step-item .step-details {
        margin-top: 2rem;
        margin-left: 0.5em;
        margin-right: 0.5em;
        padding-top: 0.2em;
    }
    .steps .step-item .step-details .step-title {
        font-size: 1.2rem;
        font-weight: 600;
    }
    .steps.is-small {
        font-size: 0.75rem;
        min-height: 1.5rem;
    }
    .steps.is-small .step-item:not(:first-child)::before {
        height: 0.2em;
        width: 100%;
        bottom: 0;
        left: -50%;
        top: 0.75rem;
    }
    .steps.is-small .step-item .step-marker {
        height: 1.5rem;
        width: 1.5rem;
        position: absolute;
        left: calc(50% - 0.75rem);
    }

    .steps.is-small .step-item .step-details {
        margin-top: 1.5rem;
        margin-left: 0.5em;
        margin-right: 0.5em;
        padding-top: 0.2em;
    }
    .steps.is-small .step-item .step-details .step-title {
        font-size: 0.9rem;
        font-weight: 600;
    }
</style>
