<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full">
	{#if data.group}
		<h3 class="font-medium text-2xl w-fit ml-auto mr-auto mt-5">{data.group.name} bearbeiten</h3>
	{/if}
	{#if data.users}
		{#each data.users as user}
			<p>{user.name}</p>
		{/each}
	{/if}
</div>
