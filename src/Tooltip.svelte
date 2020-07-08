<div class="tooltip">
    <div class="tooltip-content is-right">
        <slot name="tooltip" />
    </div>
    <slot />
</div>

<style>
    .tooltip {
        position: relative;
        display: inline-flex;
    }

    .tooltip-content {
        background: #363636;
        color: #f5f5f5;
    }

    .tooltip-content {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }

    .tooltip-content {
        width: auto;
        padding: 0.35rem 0.75rem;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: 400;
        box-shadow: 0 1px 2px 1px rgba(0, 1, 0, 0.2);
        z-index: 38;
        white-space: nowrap;
    }

    .tooltip-content.is-right {
        top: 50%;
        right: auto;
        bottom: auto;
        left: calc(100% + 5px + 2px);
        transform: translateY(-50%);
    }

    .tooltip:hover .tooltip-content {
        transition-delay: inherit;
        opacity: 1;
        visibility: visible;
    }

    .tooltip-content::before {
        z-index: 39;
    }

    .tooltip-content.is-right::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 100%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent #363636 transparent transparent;
    }
</style>
