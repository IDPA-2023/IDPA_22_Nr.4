<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { FreeInput, MultipleChoice, Select, YesOrNo } from '$lib/components/vote';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading: boolean;

	$: loading = false;

	const submitVote: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					await update();
					break;
				case 'error':
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col items-center h-hull w-full">
	<form action="?/submitVote" method="POST" use:enhance={submitVote}>
		{#each data.questions as question}
			{#if question.type === 'yesNo'}
				<YesOrNo {question} />
			{:else if question.type === 'multiple'}
				<MultipleChoice options={data.options} {question} />
			{:else if question.type === 'free'}
				<FreeInput {question} />
			{:else if question.type === 'select'}
				<Select options={data.options} {question} />
			{/if}
		{/each}
		<div class="w-full mt-4 pt-2">
			<button type="submit" class="btn btn-primary w-full" disabled={loading}>Abstimmen</button>
		</div>
	</form>
</div>
