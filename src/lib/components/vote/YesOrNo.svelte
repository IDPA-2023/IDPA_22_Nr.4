<script lang="ts">
	import type { Question } from '$lib/types';

	export let question: Question;
  
	let selected: string = ""

	function select(e: MouseEvent) {
		selected =
			selected === (e.target as HTMLInputElement)?.value
				? ''
				: (e.target as HTMLInputElement)?.value;
	}
</script>

<div class="card w-full mt-4 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
			{question.question}
		</h2>
		<div class="flex flex-col">
			<input
				type="button"
				on:click={select}
				value="Nein"
				class="btn btn-secondary w-full mt-2 {selected === 'Nein' ? '' : 'btn-outline'}"
			/>
			<input
				type="button"
				on:click={select}
				value="Ja"
				class="btn btn-secondary w-full mt-2 {selected === 'Ja' ? '' : 'btn-outline'}"
			/>
		</div>
	</div>
</div>

<input type="hidden" name="vote" value={selected} />
<input type="hidden" name="questionIDFS" value={question.id} />
