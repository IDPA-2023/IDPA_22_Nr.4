<script lang="ts">
	import type { Question } from '$lib/types';

	export let question: Question;

	let selected: string;
	$: selected = '';
</script>

<div class="card w-full mt-4 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
			{question.question}
		</h2>
		<div class="flex flex-col">
			<input
				type="text"
				bind:value={selected}
				placeholder="Ihre Antwort hier!"
				class="input input-bordered w-full mt-2"
			/>
		</div>
	</div>
</div>

<input type="hidden" name="vote" value={selected} />
<input type="hidden" name="questionIDFS" value={question.id} />
