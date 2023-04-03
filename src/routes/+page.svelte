<script lang="ts">
	import { PollCard } from '$lib/components';
	import type { PageData } from './$types';
	export let data: PageData;

    const searchPolls = data.polls.map((poll) => ({
        ...poll,
        searchTerms: `${poll.name} ${poll.description}`
    }))
</script>

<div class="flex flex-col gap-3">
    <div class="flex flex-row w-full">
        <h1 class="text-xl font-bold">Aktuelle Abstimmungen</h1>
        <input type="text" class="ml-auto input input-bordered" placeholder="Suchen..." />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each data.polls as poll}
            <PollCard {poll} user={data.user} />
        {/each}
    </div>
</div>