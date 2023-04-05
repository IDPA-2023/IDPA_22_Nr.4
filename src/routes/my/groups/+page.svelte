<script lang="ts">
	import { Icon, Pencil, Trash } from 'svelte-hero-icons';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: FormData;
</script>

<div class="w-full h-full mt-5">
	<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Meine Gruppen</h3>
	<div class="w-4/5 flex ml-auto mr-auto">
		<a href="/new/group" class="w-fit btn btn-secondary ml-auto">Gruppe erstellen</a>
	</div>
	{#if data.groups}
		{#each data.groups.items as group}
			<div class="card w-4/5 bg-base-100 shadow-xl ml-auto mr-auto mt-5">
				<div class="card-body">
					<div class="flex w-full">
						<h2 class="card-title">{group.name}</h2>
						<div class="w-fit flex ml-auto">
							<a
								href="/my/groups/{group.id}/edit"
								class="btn btn-secondary btn-circle w-12 p-2 ml-auto"><Icon src={Pencil} /></a
							>
							<form action="?/deleteGroup" method="post">
								<input type="hidden" name="groupId" value={group.id} />
								<button class="btn btn-secondary btn-circle w-12 p-2 ml-2"
									><Icon src={Trash} /></button
								>
							</form>
						</div>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
