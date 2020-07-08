<script>
    import { fly, fade } from "svelte/transition";
    import { onMount } from "svelte";

    import Topbar from "./Topbar.svelte";
    import Button from "../Button.svelte";
    import Icon from "../Icon.svelte";

    export let drawerActive = false;
    export let active;

    let not_mobile = false;

    export let navItems = [
        {
            name: "Home",
            href: "/",
            icon: "iso",
        },
    ];

    $: activeNavItem = navItems.find((item) => item.href.startsWith(active));

    onMount(async () => {
        let x = window.matchMedia("(min-width: 768px)");
        not_mobile = x.matches;
        function handleWidthChange(e) {
            not_mobile = e.matches;
            drawerActive = e.matches;
        }
        x.addListener(handleWidthChange);
        return () => x.removeListener(handleWidthChange);
    });

    const closeDrawer = () => {
        if (not_mobile) return;
        drawerActive = false;
    };
</script>

{#if drawerActive}
    {#if !not_mobile}
        <div
            on:scroll|preventDefault
            transition:fade={{ duration: 200 }}
            on:click={() => (drawerActive = !drawerActive)}
            class="aside-background"
        />
    {/if}

    <aside transition:fly={{ x: -300, duration: 200 }} class="menu">

        <div class="logo">
            <Icon size="7em" color="#ffcc00" />
        </div>
        <div class="menu">

            <p class="menu-label" />
            {#each navItems as item}
                <a
                    on:click={closeDrawer}
                    class:is-active={item === activeNavItem}
                    href={item.href}
                >
                    <Icon name={item.icon} />
                    <span>{item.name}</span>
                </a>
            {/each}
        </div>

        <hr />
    </aside>
{/if}

<nav class="bottombar" role="navigation">
    {#each navItems as item}
        <a class="bottombar-item" href={item.href}>
            <Icon name={item.icon} />
            <p>{item.name}</p>
        </a>
    {/each}
</nav>

<section class:left-padding={drawerActive}>
    <slot name="content">CONTENT</slot>
</section>

<style>
    .logo {
        margin: 2em auto;
    }

    .aside-background {
        background-color: rgba(10, 10, 10, 0.86);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 30;
    }

    aside {
        position: fixed;
        height: 100%;
        width: 250px;
        background-color: white;
        display: block;
        left: 0;
        top: 3.25rem;
        z-index: 31;
        padding: 20px;
        box-shadow: rgba(10, 10, 10, 0.1) 0 6px 10px 0px;
    }
    .menu-label {
        color: #7a7a7a;
        font-size: 0.75em;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .menu {
        line-height: 1.5;
        display: flex;
        flex-direction: column;
    }

    .menu a {
        display: flex;
        border-radius: 2px;
        color: #4a4a4a;
        padding: 0.5em 0.75em;
    }
    .menu a:hover {
        background-color: #f5f5f5;
        color: #363636;
    }

    .menu a.is-active {
        background-color: #3273dc;
        color: #fff;
    }

    .menu a span {
        padding-left: 0.75em;
    }

    .bottombar {
        background-color: white;
        left: 0;
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 28;
        min-height: 3.25rem;
        box-shadow: rgba(10, 10, 10, 0.1) 0 0 10px 0px;

        align-items: stretch;
        display: none;
        flex-shrink: 0;
        min-height: 3.25rem;
    }

    .bottombar-item {
        flex-grow: 1;
        flex-shrink: 1;
        color: #4a4a4a;
        padding: 0.5rem 0.75rem;
        text-align: center;
    }
    .bottombar-item > p {
        font-size: 0.75rem !important;
    }
    .bottombar-item:hover {
        background-color: #fafafa;
        color: #3273dc;
    }

    @media only screen and (max-width: 768px) {
        aside {
            top: 0;
        }
        .bottombar {
            display: flex;
        }
    }

    section {
        transition: padding-left 0.3s;
    }
    @media only screen and (min-width: 768px) {
        .left-padding {
            padding-left: 300px;
        }
    }

    section {
        padding: 3rem 1.5rem;
        padding-top: 6.5rem;
    }
</style>
