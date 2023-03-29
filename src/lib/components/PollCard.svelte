<script lang="ts">
	import type { Poll } from '$lib/types';

	export let poll: Poll;
</script>

<div class="card mx-3 sm:mx-0 sm:w-72 bg-base-100 shadow-xl w-fit max-h-96">
	<div class="card-body">
		<h2 class="card-title">{poll.name}</h2>
		<p>{poll.description}</p>
		<div class="card-actions justify-end mt-2">
			<a href={`/polls/${poll.id}`} class="btn btn-primary w-full">Resultate anschauen</a>
			<a href={`/polls/${poll.id}/questions/vote`} class="btn btn-secondary w-full">Abstimmen</a>
		</div>
	</div>
</div>
