<script lang="ts">
	import type { User, Vote } from '$lib/types';

	export let votes: Vote[];

	let users = votes.map((vote) => vote.expand.userIDFS as User);

	let answers = votes.map((vote) => vote.vote);
	const occurences = answers.reduce((acc: { [key: string]: number }, curr) => {
		return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
	}, {});

	Object.entries(occurences).sort((a, b) => b[1] - a[1]);

	let chartValues = Object.values(occurences);
	let chartLabels = Object.keys(occurences);

</script>

<div class="overflow-x-auto">
	{#if votes.length === 0}
		<div class="flex justify-center">
			<p class="text-xl">Noch keine Abstimmungen 😥</p>
		</div>
	{:else}
		<table class="table w-full">
			<thead>
				<tr>
					<th>Abstimmung</th>
					<th>Anzahl</th>
				</tr>
			</thead>
			<tbody>
				{#each chartLabels as vote, i}
					<tr>
						<td>{vote}</td>
						<td>{chartValues[i]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
