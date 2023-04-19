<script lang="ts">
	import { MyPolls } from '$lib/components';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h2 class="text-3xl font-bold">Meine Abstimmungen</h2>
<div class="w-full mt-4 flex flex-col items-center">
	{#if data.polls.length === 0}
		<p class="text-center text-3xl">😥</p>
		<p class="text-center text-3xl">Du hast noch keine Abstimmungen</p>
		<a href="/new" class="btn btn-primary max-w-md mt-4">Erstelle eine</a>
	{:else}
		{#each data.polls as poll}
			<MyPolls {poll} />
			<div class="divider mt-3 mb-2" />
		{/each}
	{/if}
</div>
