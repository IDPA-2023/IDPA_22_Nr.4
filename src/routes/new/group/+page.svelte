<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full h-full mt-5">
	<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Gruppe erstellen</h3>
	<form action="?/createGroup" method="post">
		<div class="w-1/3 mr-auto ml-auto">
			<Input
				type="text"
				name="name"
				required={true}
				label="Gruppenname"
				id="name"
				placeholder="PollToll Gruppe"
			/>
		</div>
		<form action="?/getUserByUsername" method="post">
			<div class="w-1/3 mr-auto ml-auto flex mt-8">
				<Input
					type="text"
					name="username"
					required={true}
					label="Benutzername des einzuladenen Benutzers"
					id="username"
					placeholder="username1234"
				/>
				<button type="submit" class="w-fit btn btn-secondary ml-px mb-2 mt-auto">+</button>
			</div>
		</form>

		<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Bereits hinzugefügte Benutzer</h3>
		{#if data.users}
			<ul class="list-disc w-fit mr-auto ml-auto mt-5">
				{#each data.users as user}
					<li>Benutzername: <strong>{user.username}</strong>, Name: {user.name}</li>
				{/each}
			</ul>
		{/if}
		<div class="w-full flex mt-5">
			<button type="submit" class="btn btn-primary ml-auto mr-auto">Gruppe erstellen</button>
		</div>
	</form>
</div>
