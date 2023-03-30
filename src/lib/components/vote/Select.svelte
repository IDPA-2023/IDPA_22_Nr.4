<script lang="ts">
	import type { Option, Question } from '$lib/types';

	export let options: Option[];
	export let question: Question;

	options = options.filter((option) => option.questionIDFS === question.id);

	let selected: string[] = [];
	options.forEach(() => selected.push(""));
</script>

<div class="card w-full mt-4 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
			{question.question}
		</h2>
		<div class="flex flex-col">
			{#if options}
				{#each options as option, idx}
					<input
						type="button"
						value={option.option}
						class="btn btn-secondary w-full mt-2 {selected[idx] === option.option ? "" : "btn-outline"}"
						on:click={() => {
							if (selected[idx] === option.option) {
								selected[idx] = "";
							} else {
                                selected.forEach((_, index) => {
                                    if (index === idx) {
                                        selected[index] = option.option;
                                    } else {
                                        selected[index] = "";
                                    }
                                });
								selected[idx] = option.option;
							}
						}}
					/>
					<input type="hidden" name="vote" value={selected[idx]} />
					<input type="hidden" name="questionIDFS" value={question.id} />
				{/each}
			{/if}
		</div>
	</div>
</div>