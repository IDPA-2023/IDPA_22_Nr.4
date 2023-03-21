<script lang="ts">
	import type { Poll, User } from "$lib/types";
	import { Icon, PencilSquare } from "svelte-hero-icons";

	export let poll: Poll;
	export let user: User | undefined;
</script>

<div class="card mx-3 sm:mx-0 sm:w-72 bg-base-100 shadow-xl w-fit max-h-96">
	<div class="card-body">
		<h2 class="card-title">{poll.name}</h2>
		<p>{poll.description}</p>
		<div class="card-actions justify-end">
			<a href={`/polls/${poll.id}`} class="btn btn-primary">Resultate anschauen</a>
		</div>
	</div>
	{#if poll.hostIDFS === user?.id}
	<div class="w-10 p-2 rounded-full absolute btn-secondary -top-3 -right-3 cursor-pointer">
		<a href={`/polls/${poll.id}/edit`}><Icon src={PencilSquare} /></a>
	</div>
	{/if}
</div>
