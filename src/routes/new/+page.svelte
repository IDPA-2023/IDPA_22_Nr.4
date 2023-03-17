<script lang="ts">
	import { Icon, ChevronRight, ChevronLeft } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import Input from '$lib/components/Input.svelte';

	export let showPollType: boolean;
	export let showPollVisibility: boolean;
	export let showPollYesNo: boolean;
	export let showPollMultiple: boolean;
	export let showPollRandom: boolean;
	export let showPollVariables: boolean;

	export let data: PageData;

	$: showPollType = true;
	$: showPollVisibility = false;
	$: showPollYesNo = false;
	$: showPollMultiple = false;
	$: showPollRandom = false;
	$: showPollVariables = false;

	let pollType = '';
	let pollVisibility = '';
	let majority: boolean;
	let question: string;
	let name: string = '';
	let description: string = '';
	$: pollType = 'multiple';
	$: pollVisibility = 'public';
	$: majority = false;
	$: question = '';
	$: description = '';

	let error = '';
	$: error = '';

	const changePageVisibility = () => {
		console.log(pollType);
		console.log(name);
		if (pollVisibility !== '' && name !== '') {
			if (pollType === 'multiple') {
				console.log('multiple if');
				showPollMultiple = true;
				showPollVisibility = false;
				error = '';
			} else if (pollType === 'yesNo') {
				showPollYesNo = true;
				showPollVisibility = false;
				error = '';
			} else if (pollType === 'random') {
				showPollRandom = true;
				showPollVisibility = false;
				error = '';
			} else {
				error = 'Bitte wählen Sie eine Option aus';
			}
		} else {
			error = 'Bitte wählen Sie eine Option aus oder füllen Sie das Eingabefeld aus';
		}
		console.log(showPollVisibility);
	};

	const changePageType = () => {
		showPollType = false;
		showPollVisibility = true;
		error = '';
	};
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/addPoll" method="post">
			<div class="w-full {showPollType ? 'visible pt-10' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Abstimmungsart auswählen</h3>
				<p class="w-fit ml-auto mr-auto">Welche Art von Abstimmung soll es werden?</p>
				<div class="ml-auto mr-auto w-fit mt-5">
					<ul class="menu menu-horizontal rounded-box bg-secondary text-black">
						<li>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<a
								on:click={() => {
									pollType = 'multiple';
								}}
							>
								<div class="flex flex-col">
									<p
										class="font-bold ml-auto mr-auto {pollType === 'multiple' ? 'text-white' : ''}"
									>
										Multiple Choice
									</p>
									<p class="text-sm w-40 ml-auto mr-auto text-center">
										Man kann zwischen mehreren vordefinierten Optionen wählen
									</p>
								</div>
							</a>
						</li>
						<li>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<a
								on:click={() => {
									pollType = 'yesNo';
								}}
							>
								<div class="flex flex-col">
									<p class="font-bold ml-auto mr-auto {pollType === 'yesNo' ? 'text-white' : ''}">
										Ja/ Nein
									</p>
									<p class="text-sm w-40 ml-auto mr-auto text-center">
										Man kann nur zwischen die Optionen Ja oder Nein wählen, sowie sich enthalten
									</p>
								</div>
							</a>
						</li>
						<li>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<a
								on:click={() => {
									pollType = 'random';
								}}
							>
								<div class="flex flex-col">
									<p class="font-bold ml-auto mr-auto {pollType === 'random' ? 'text-white' : ''}">
										Freie Antwort
									</p>
									<p class="text-sm w-40 ml-auto mr-auto text-center">
										Eine freie Antwort kann eingegeben werden
									</p>
								</div>
							</a>
						</li>
					</ul>
					<input type="hidden" name="pollType" id="pollType" value={pollType} />
				</div>
				<button
					type="button"
					on:click={() => {
						pollType !== '' ? changePageType() : (error = 'Bitte wählen Sie eine Option aus');
					}}
					class=" ml-auto mr-auto mt-5 btn btn-primary flex flex-col"
					><span class="flex text-center btn-md"
						><span class="h-fit mt-auto mb-auto">Weiter</span>
						<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
					></button
				>
			</div>
			<div class="w-full {showPollVisibility ? 'visible pt-10' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
					Abstimmungssichtbarkeit auswählen
				</h3>
				<p class="w-fit ml-auto mr-auto">Wer soll an der Abstimmung teilnehmen dürfen?</p>
				<div class="ml-auto mr-auto w-fit {showPollVisibility ? 'visible mt-5' : 'invisible h-0'}">
					<div class="ml-auto mr-auto w-fit  {showPollVisibility ? 'visible' : 'invisible h-0'}">
						<div
							class="w-full max-w-lg ml-auto mr-auto {showPollVisibility
								? 'visible mb-2'
								: 'invisible h-0'}"
						>
							<label for="title" class="label font-medium pb-1">
								<span class="label-text">Titel</span>
							</label>
							<input
								class={'input input-bordered w-full max-w-lg'}
								type="text"
								id="title"
								name="title"
								bind:value={name}
								placeholder="PollToll Abstimmung"
							/>
						</div>
						<div
							class="w-full max-w-lg ml-auto mr-auto {showPollVisibility
								? 'visible mb-2'
								: 'invisible h-0'}"
						>
							<label for="title" class="label font-medium pb-1">
								<span class="label-text">Beschreibung</span>
							</label>
							<input
								class={'input input-bordered w-full max-w-lg'}
								type="text"
								id="description"
								name="description"
								bind:value={description}
								placeholder="PollToll Abstimmung"
							/>
						</div>
						<ul class="menu menu-horizontal rounded-box bg-secondary mt-5 text-black">
							<li>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									on:click={() => {
										pollVisibility = 'public';
									}}
								>
									<div class="flex flex-col">
										<p
											class="font-bold ml-auto mr-auto {pollVisibility === 'public'
												? 'text-white'
												: ''}"
										>
											Öffentlich
										</p>
										<p class="text-sm w-40 ml-auto mr-auto text-center">
											Die Abstimmung ist für alle ersichtlich und frei zugänglich
										</p>
									</div>
								</a>
							</li>
							<li>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									on:click={() => {
										pollVisibility = 'privateLink';
									}}
								>
									<div class="flex flex-col">
										<p
											class="font-bold ml-auto mr-auto {pollVisibility === 'privateLink'
												? 'text-white'
												: ''}"
										>
											Privat (mit Link Einladung)
										</p>
										<p class="text-sm w-40 ml-auto mr-auto text-center">
											Alle, die den Link und den Zugangscode zur Abstimmung erhalten dürfen darin
											teilnehmen
										</p>
									</div>
								</a>
							</li>
							<li>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									on:click={() => {
										pollVisibility = 'privateUsers';
									}}
								>
									<div class="flex flex-col">
										<p
											class="font-bold ml-auto mr-auto {pollVisibility === 'privateUsers'
												? 'text-white'
												: ''}"
										>
											Privat mit Login
										</p>
										<p class="text-sm w-40 ml-auto mr-auto text-center">
											Alle Benutzer die registriert sind und eingeladen wurden und/oder zu einer
											Gruppe gehören, die eingeladen wurde, dürfen teilnehmen.
										</p>
									</div>
								</a>
							</li>
						</ul>
						<input type="hidden" name="pollVisibility" id="pollVisibility" value={pollVisibility} />
					</div>
					<div class="flex w-fit ml-auto mr-auto">
						<button
							type="button"
							on:click={() => {
								showPollType = true;
								showPollVisibility = false;
							}}
							class="mt-5 btn btn-primary flex flex-col mr-2"
							><span class="flex text-center btn-md"
								><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" /><span
									class="h-fit mt-auto mb-auto">Zurück</span
								></span
							></button
						>
						<!--<button
							type="button"
							on:click={changePageVisibility}
							class="mt-5 btn btn-primary flex flex-col"
							><span class="flex text-center btn-md"
								><span class="h-fit mt-auto mb-auto">Weiter</span>
								<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
							></button
						>-->
					</div>
					<button type="submit" class="btn btn-primary mr-auto ml-auto">Abstimmung Speichern</button
					>
				</div>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				{#if error !== ''}
					<div class="alert alert-warning shadow-lg w-fit ml-auto mr-auto mt-10">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/></svg
							>
							<span>{error}</span>
						</div>
					</div>
				{/if}
			</div>
		</form>
	</div>
</div>
