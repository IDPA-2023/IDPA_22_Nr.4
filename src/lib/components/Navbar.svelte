<script lang="ts">
	import type { User } from '$lib/types';
	import { getImageURL } from '$lib/utils';

	export let user: User | undefined;
</script>

<div class="navbar bg-base-100 w-auto rounded-md shadow-2xl">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">PollToll</a>
	</div>
	<div class="flex-none gap-2">
		<div class="form-control">
			<input type="text" placeholder="Suchen" class="input input-bordered" />
		</div>
		{#if !user}
			<div class="dropdown dropdown-end">
				<a href="/login" class="btn btn-primary">Login</a>
				<a href="/register" class="btn btn-secondary">Registrieren</a>
			</div>
		{:else}
			<a href="/new" class="btn btn-secondary btn-outline">Abstimmung erstellen</a>
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
						<a href="/profile" class="justify-between">
							Meine Abstimmungen
							<span class="badge">Neu</span>
						</a>
					</li>
					<li><a href="/my/groups">Meine Gruppen</a></li>
					<li><a href="/my/settings">Einstellungen</a></li>
					<li><a href="/logout">Logout</a></li>
				</ul>
			</div>
		{/if}
	</div>
</div>
