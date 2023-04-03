<script lang="ts">
	import type { Question, User, Vote } from '$lib/types';
	import { Chart, PieChart, Table } from '$lib/components';

	export let question: Question;
	export let votes: Vote[];
	export let pie: boolean = false;
	export let groupCount: number = 0;

	votes = votes.filter((vote) => {
		return vote.questionIDFS === question.id;
	});
</script>

<div class="mockup-window border-base-100 bg-base-300">
	<div class="flex justify-center px-4 pt-2 bg-base-200">
		<h3 class="text-xl font-bold">
			{question.question}
		</h3>
	</div>
	<div class="p-3 bg-base-200 max-h-full flex justify-center">
		{#if pie}
			<PieChart {votes} {groupCount} />
		{:else if question.type === 'select' || question.type === 'multiple' || question.type === 'yesNo'}
			<Chart {votes} />
		{:else}
			<Table {votes} />
		{/if}
	</div>
</div>
