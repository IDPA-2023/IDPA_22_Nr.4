<script lang="ts">
	import type { Question, Vote } from '$lib/types';
	import { Chart, Table } from '$lib/components';
	import { Simple, Absolute, TwoThird } from '$lib/components/pieCharts';

	export let question: Question;
	export let votes: Vote[];
	export let pie: boolean = false;
	export let groupCount: number = 0;
	export let pieType: string = '';

	votes = votes.filter((vote) => {
		return vote.questionIDFS === question.id;
	});
	console.log(pieType);
</script>

<div class="mockup-window border-base-100 bg-base-300">
	<div class="flex flex-col justify-center px-4 pt-2 bg-base-200">
		<h3 class="text-xl font-bold text-center">
			{question.question}
		</h3>
		{#if votes.length !== 0}
			<div class="flex flex-row justify-center gap-3 py-2">
				<div class="badge badge-primary">Angenommen</div>
				<div class="badge badge-secondary">Abgelehnt</div>
			</div>
		{/if}
	</div>
	<div class="p-3 bg-base-200 max-h-full flex justify-center">
		{#if pie && question.type !== 'free'}
			{#if pieType === 'absMajority'}
				<Absolute {votes} {groupCount} />
			{:else if pieType === 'relMajority'}
				<Simple {votes} />
			{:else if pieType === 'twothirdMajority'}
				<TwoThird {votes} {groupCount} />
			{:else}
				<Chart {votes} />
			{/if}
		{:else if question.type === 'select' || question.type === 'multiple' || question.type === 'yesNo'}
			<Chart {votes} />
		{:else}
			<Table {votes} />
		{/if}
	</div>
</div>
