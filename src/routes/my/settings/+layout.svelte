<script lang="ts">
    import { page } from '$app/stores'

    export let data

    const navigation = [
        {
            title: 'Profil',
            href: '/my/settings/profile'
        },{
            title: 'Konto',
            href: '/my/settings/account'
        },{
            title: 'Sicherheit',
            href: '/my/settings/security'
        }
    ]
</script>

<div class="max-w-6xl h-full px-2 ml-auto mr-auto">
    <div class="divider fg-black"><h3 class="text-2xl font-medium ml-auto mr-auto w-fit">Einstellungen</h3></div>
</div>
<div class="flex max-w-6xl h-full space-x-4 ml-auto mr-auto mt-10">
    <ul class="menu w-60 rounded-box p-2">
        {#each navigation as navItem}
        <li>
            <a href={navItem.href} class="font-medium {$page.url.pathname === navItem.href ? 'btn-primary' : ''}">{navItem.title}</a>
        </li>
        {/each}
    </ul>
    <div class="w-full">
        <slot />
    </div>
</div>

