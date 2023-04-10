<script lang="ts">
	import type { Question } from '$lib/types';
	import type { PageData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Modal, Input } from '$lib/components';

	export let data: PageData;

	let deleteQuestionOpen : boolean
	let loading : boolean

	$: deleteQuestionOpen = false
	$: loading = false

	const submitDeleteQuestion = () => {
		loading = true
		deleteQuestionOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					console.log('success');
					await invalidateAll();
					deleteQuestionOpen = false;
					break;
				case 'error':
					break;
				default:
					console.log('default');
					await applyAction(result);
			}
		};
	};
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
				<a href="/polls/{data.pollId}/questions/{question.id}/edit" class="btn btn-primary">Bearbeiten</a>
				<Modal label={question.id} checked={deleteQuestionOpen}>
					<span slot="trigger" class="btn btn-error sm:ml-2 mt-2 sm:mt-0 w-full">Löschen</span>
					<div slot="heading">
						<h3 class="text-2xl">Lösche die Frage {question.question}</h3>
						<p class="text-base font-normal mt-2">
							Bist du dir sicher, dass du "{question.question}" löschen möchtest? Dieser Vorgang kann nicht
							rückgängig gemacht werden.
						</p>
					</div>
					<div slot="actions" class="flex w-full items-center justify-center space-x-2">
						<label for={question.id} class="btn btn-outline">Abbrechen</label>
						<form action="?/deleteQuestion" method="POST" use:enhance={submitDeleteQuestion}>
							<input type="hidden" name="id" value={question.id} />
							<button type="submit" class="btn btn-error" disabled={loading}>Löschen</button>
						</form>
					</div>
				</Modal>
			</div>
		</div>
	</div>
{/each}
