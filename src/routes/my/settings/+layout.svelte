<script lang="ts">
	import { page } from '$app/stores';

	const navigation = [
		{
			title: 'Profil',
			href: '/my/settings/profile'
		},
		{
			title: 'Konto',
			href: '/my/settings/account'
		},
		{
			title: 'Sicherheit',
			href: '/my/settings/security'
		},
		{
			title: 'Aussehen',
			href: '/my/settings/appearance'
		}
	];
</script>

<div class="max-w-6xl h-full px-2 ml-auto mr-auto">
	<div class="divider">
		<h3 class="text-2xl font-medium ml-auto mr-auto w-fit">Einstellungen</h3>
	</div>
</div>
<div class="flex flex-col max-w-6xl h-full space-x-4 ml-auto mr-auto mt-10">
    <ul class="menu menu-horizontal w-fit rounded-box p-2 ml-auto mr-auto">
        {#each navigation as navItem}
        <li>
            <a href={navItem.href} class="{$page.url.pathname === navItem.href ? 'font-bold bg-base-100' : 'font-medium'}">{navItem.title}</a>
        </li>
        {/each}
    </ul>
    <div class="w-full">
        <slot />
    </div>
</div>
