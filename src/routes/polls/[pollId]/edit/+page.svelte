<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;
	$: loading = false;

	const SubmitUpdatePoll: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					toast.error('something went wrong');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col items-center h-full w-full gap-4">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="card-title">
				<h2 class="text-2xl font-bold lg:text-5xl">
					Bearbeite "{data.poll.name}"
				</h2>
			</div>
		</div>
	</div>
	<div class="card p-6 w-full max-w-lg bg-base-100 shadow-xl">
		<form action="?/editPoll" method="POST" use:enhance={SubmitUpdatePoll}>
			<Input
				id="title"
				disabled={loading}
				value={form?.data.title ?? data.poll.name}
				errors={form?.errors.title}
				label="Titel"
			/>
			<Input
				id="description"
				disabled={loading}
				errors={form?.errors.description}
				value={form?.data.description ?? data.poll.description}
				label="Beschreibung"
			/>
			<input disabled={loading} type="submit" class="btn btn-primary mt-2 w-full" value="Speichern" />
		</form>
	</div>
</div>
