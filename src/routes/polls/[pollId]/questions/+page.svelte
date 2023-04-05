<script lang="ts">
	import type { Question } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full mt-5 flex">
	<a href="/polls/{data.pollId}/questions/new" class="btn btn-primary ml-auto"
		>Neue Frage hinzufügen</a
	>
</div>

{#each data.questions.questions as question}
	<div class="card w-4/5 bg-base-100 shadow-xl ml-auto mr-auto mt-5 mb-5">
		<div class="card-body">
			<h2 class="card-title">{question.question}</h2>
			<p>Art: {question.type}</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Bearbeiten</button>
			</div>
		</div>
	</div>
{/each}
