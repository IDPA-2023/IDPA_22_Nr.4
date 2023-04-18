<script lang="ts">
	import { PollCard } from '$lib/components';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

    const searchPolls = data.polls.map((poll) => ({
        ...poll,
        searchTerms: `${poll.name} ${poll.description}`
    }))

    const searchStore = createSearchStore(searchPolls);

    const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="flex flex-col gap-3">
    <div class="flex flex-row w-full">
        <h1 class="text-xl font-bold">Aktuelle Abstimmungen</h1>
        <input type="text" class="ml-auto input input-bordered" placeholder="Suchen..." bind:value={$searchStore.search} />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each $searchStore.filtered as poll}
            <PollCard {poll} user={data.user} />
        {/each}
    </div>
</div>