<script lang="ts">
	import type { User } from '$lib/types';
	import { getImageURL } from '$lib/utils';
	import { Icon, Plus, PlusCircle } from 'svelte-hero-icons';

	export let user: User | undefined;
	$: innerWidth = 1000
</script>

<svelte:window bind:innerWidth />
<div class="navbar bg-base-100 w-auto rounded-md shadow-2xl">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">PollToll</a>
	</div>
	<div class="flex-none gap-2">
		{#if !user}
			<div class="dropdown dropdown-end">
				<a href="/login" class="btn btn-primary">Login</a>
				<a href="/register" class="btn btn-secondary">Registrieren</a>
			</div>
		{:else}
			{#if innerWidth > 426}
				<a href="/new" class="btn btn-secondary btn-outline">Abstimmung erstellen</a>
			{:else}
				<a href="/new" class="btn btn-secondary p-2 btn-circle"><Icon src={Plus}/></a>
			{/if}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							alt="avatar"
							src={user?.avatar
								? getImageURL(user?.collectionId, user?.id, user?.avatar, '80x80')
								: `https://ui-avatars.com/api/?name=${user?.name}`}
						/>
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<a href="/my/polls" class="justify-between">
							Meine Abstimmungen
						</a>
					</li>
					<li><a href="/my/settings">Einstellungen</a></li>
					<li><a href="/logout">Logout</a></li>
				</ul>
			</div>
		{/if}
	</div>
</div>
