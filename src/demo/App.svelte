<script>
    import Nav from "../nav/Nav.svelte";
    import HamburgerButton from "../nav/HamburgerButton.svelte";
    import Topbar from "../nav/Topbar.svelte";
    import DropdownMenu from "../DropdownMenu.svelte";
    import Avatar from "../Avatar.svelte";

    let drawerActive = false;

    const menuItems = [
        { type: "a", href: "/account", content: "My Account" },
        { type: "hr" },
        {
            type: "button",
            onClick: () => {},
            content: "Log out",
        },
    ];

    let navItems = [
        {
            name: "Home",
            href: "/",
            icon: "iso",
        },
        {
            name: "Home",
            href: "/",
            icon: "iso",
        },
    ];
</script>

<Topbar>
    <div slot="left">
        <HamburgerButton
            {drawerActive}
            on:click={() => (drawerActive = !drawerActive)}
        />
    </div>

    <div style="margin-right: 0.7em;" slot="right">
        <DropdownMenu {menuItems}>
            <div slot="trigger">
                <Avatar />
            </div>
        </DropdownMenu>
    </div>
</Topbar>

<Nav bind:drawerActive {navItems}>
    <div slot="content">TTTTR</div>
</Nav>

<style>

</style>
