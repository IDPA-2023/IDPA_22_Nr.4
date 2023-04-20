<script lang="ts">
	import type { PageData } from '../../$types';
	import Input from '$lib/components/Input.svelte';
	import { add } from 'svelte-french-toast/core/store';
	import { Icon, Trash } from 'svelte-hero-icons';

	export let data: PageData;

	let newOptions = [];
	let oldOptions = [];

	if (data.question.question.type === 'select' || data.question.question.type === 'multiple') {
		$: newOptions = data.options.options.items;
		$: oldOptions = data.options.options.items;
	}

	const addOption = () => {
		newOptions[newOptions.length] = '';
		console.log(data.options.options.items);
	};
	const removeOptionByIndex = (idx: number) => {
		newOptions.splice(idx, 1);
		newOptions = newOptions;
	};
	console.log('Data');
	console.log(data);
</script>

<div class="w-full">
	{#if data.question.question.type === 'multiple' || data.question.question.type === 'select'}
		<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Multiple/ Select Frage bearbeiten</h3>
		<form action="?/editQuestion" method="post">
			<div class="w-96 ml-auto mr-auto flex flex-col">
				<Input
					label="Frage"
					id="question"
					name="question"
					value={data.question.question.question}
				/>
				{#each newOptions as option, idx}
					<div class="w-80 flex mb-2 ml-auto mr-auto">
						<div class="form-control w-80 ml-auto mr-auto flex flex-col">
							<label for="option{idx}" class="label font-medium pb-1">
								<span class="label-text">Option {option.option}</span>
							</label>
							<input
								type="text"
								value={option.option}
								required={true}
								id="option{idx}"
								name="option{idx}"
								class="input input-bordered w-full max-w-lg mt-auto"
							/>
							{#if option.id}
								<input type="hidden" name={option.id} id={option.id} value={idx} />
							{/if}
						</div>
						<button
							type="button"
							on:click={() => removeOptionByIndex(idx)}
							class="btn btn-secondary mt-auto ml-1 w-12"><Icon src={Trash} /></button
						>
					</div>
				{/each}
				<input type="hidden" name="options" id="options" value={newOptions} />
				<input type="hidden" name="oldOptions" id="oldOptions" value={oldOptions} />
				<button type="button" on:click={addOption} class="btn btn-secondary ml-auto mr-auto"
					>Option hinzufügen</button
				>
				<button type="submit" class="btn btn-primary mt-7 w-56 ml-auto mr-auto"
					>Änderungen Speichern</button
				>
			</div>
		</form>
	{:else if data.question.question.type === 'yesNo'}
		<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Ja/Nein Frage bearbeiten</h3>
		<div class="w-96 ml-auto mr-auto">
			<form action="?/editQuestion" method="post">
				<Input
					label="Frage"
					id="question"
					name="question"
					value={data.question.question.question}
				/>
				<button type="submit" class="btn btn-primary mt-7 w-56 ml-auto mr-auto"
					>Änderungen Speichern</button
				>
			</form>
		</div>
	{:else if data.question.question.type === 'free'}
		<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Frage mit freier Antwort bearbeiten</h3>
		<div class="w-96 ml-auto mr-auto">
			<form action="?/editQuestion" method="post">
				<Input
					label="Frage"
					id="question"
					name="question"
					value={data.question.question.question}
				/>
				<button type="submit" class="btn btn-primary mt-7 w-56 ml-auto mr-auto"
					>Änderungen Speichern</button
				>
			</form>
		</div>
	{/if}
</div>
