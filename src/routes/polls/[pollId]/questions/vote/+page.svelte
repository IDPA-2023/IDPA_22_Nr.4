<script lang="ts">
	import { FreeInput, MultipleChoice, Select, YesOrNo } from '$lib/components/vote';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col items-center h-hull w-full">
	<form action="?/submitVote" method="POST">
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
		<div class="w-full mt-4 max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Abstimmen</button>
		</div>
	</form>
</div>
