<script>
    export let isFlipped = false;
</script>

<article on:click class:is-flipped={isFlipped}>
    <div class="face front">
        <slot name="front">
            <div class="red">front</div>
        </slot>
    </div>
    <div class="face back absolute">
        <slot name="back">
            <div class="blue">back</div>
        </slot>
    </div>
</article>
{#if false}
    <slot />
{/if}

<style>
    article {
        /* cursor: pointer; */
        position: relative;

        transition: transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        transform: perspective(800px) rotateY(0deg);
        transform-style: preserve-3d;
    }

    .is-flipped {
        transform: perspective(800px) rotateY(180deg);
    }

    .absolute {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }

    .face {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -o-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .red {
        height: 200px;
        width: 100%;
        background: red;
    }
    .blue {
        background: blue;
        height: 100%;
    }

    .back {
        transform: rotateY(180deg);
        z-index: 200;
    }
</style>
