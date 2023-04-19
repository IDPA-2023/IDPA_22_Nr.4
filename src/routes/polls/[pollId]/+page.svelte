<script lang="ts">
	import { page } from '$app/stores';
	import { Question } from '$lib/components';
	import { Icon, PencilSquare } from 'svelte-hero-icons';
	import { string } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;
	let pieType: string;
	data.variables.forEach((variable) => {
		pieType = variable.type;
	});
</script>

<div class="flex flex-col items-center h-full w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="card-title">
				<h2 class="text-2xl font-bold lg:text-5xl">
					{data.poll.name}
				</h2>
			</div>
			<div class="flex flex-row">
				<p>{data.poll.description}</p>
				{#if data.poll.hostIDFS === data.user?.id}
					<div class="w-10 p-2 rounded-full cursor-pointer absolute btn-secondary -top-3 -right-3">
						<a href={`${$page.url.pathname}/edit`}><Icon src={PencilSquare} /></a>
					</div>
				{/if}
			</div>
		</div>
	</div>
	{#each data.questions as question}
		<div class="mt-5 w-full">
			<Question
				{question}
				votes={data.votes}
				pie={data.poll.groupIDFS !== ''}
				{pieType}
				groupCount={data.groupCount}
			/>
		</div>
	{/each}
	{#if data.questions.length === 0}
		<div class="mt-5 w-full">
			<p class="text-center text-3xl">😥</p>
			<p class="text-center text-3xl">Es wurden noch keine Fragen hinzugefügt.</p>
		</div>
	{/if}
</div>
