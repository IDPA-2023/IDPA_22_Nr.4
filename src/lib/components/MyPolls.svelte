<script lang="ts">
	import type { Poll } from '$lib/types';
	import { getImageURL } from '$lib/utils';
	import { Modal } from '$lib/components';
	import { toast } from 'svelte-french-toast';
	import { enhance, type SubmitFunction } from '$app/forms';
	export let poll: Poll;
	let modalOpen: boolean;
	$: modalOpen = false;
	let loading = false;
	const submitDeleteProject: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Project deleted successfully');
					await update();
					break;
				case 'error':
					toast.error("Couldn't delete project");
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/polls/{poll.id}" class="font-semibold text-lg">{poll.name}</a>
		<p>{poll.description}</p>
	</div>
	<div class="flex items-center justify-end w-full sm:flex-row flex-col">
		<a href="/polls/{poll.id}/edit" class="btn btn-outline w-full sm:w-fit">Bearbeiten</a>
		<Modal label={poll.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error sm:ml-2 mt-2 sm:mt-0 w-full">Löschen</span>
			<div slot="heading">
				<h3 class="text-2xl">Lösche {poll.name}</h3>
				<p class="text-base font-normal mt-2">
					Bist du dir sicher, dass du "{poll.name}" löschen möchtest? Dieser Vorgang kann nicht
					rückgängig gemacht werden.
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={poll.id} class="btn btn-outline">Abbrechen</label>
				<form action="?/deleteProject" method="POST" use:enhance={submitDeleteProject}>
					<input type="hidden" name="id" value={poll.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Löschen</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
