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
	let title = '';
	let majority: boolean;
	let question: string;
    let name : string;
	$: pollType = 'multiple';
	$: pollVisibility = 'public';
	$: title = '';
	$: majority = false;
	$: question = '';
    $: name = '';

	let error = '';
	$: error = '';

	let options: string[];
	$: options = ['', ''];

	const addOption = () => {
		options[options.length] = '';
	};

	const removeOption = () => {
		options.pop();
	};

	const changePageVisibility = () => {
		console.log(pollType);
		console.log(pollVisibility);
		title = document.getElementsByName('name')[0].value;
		if (pollVisibility !== '' && title !== '') {
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
	};

	const changePageType = () => {
		showPollType = false;
		showPollVisibility = true;
		error = '';
	};

	const changePageQuestion = () => {
		if (question !== '') {
		}
	};
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/addPoll" method="post">
			<div class="w-full pt-10 {showPollType ? 'visible' : 'invisible h-0'}">
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
			<div class="w-full {showPollVisibility ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
					Abstimmungssichtbarkeit auswählen
				</h3>
				<p class="w-fit ml-auto mr-auto">Wer soll an der Abstimmung teilnehmen dürfen?</p>
				<div class="ml-auto mr-auto w-fit mt-5">
					<div class="ml-auto mr-auto w-fit">
						<Input id="name" bind:value={name} label="Titel der Abstimmung" placeholder="PollToll Abstimmung" />
					</div>
					<ul class="menu menu-horizontal rounded-box bg-secondary mt-5 text-black">
						<li>
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
					<button
						type="button"
						on:click={changePageVisibility}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><span class="h-fit mt-auto mb-auto">Weiter</span>
							<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
						></button
					>
				</div>
			</div>
			<!--Ab hier kommen die Divs für die Erstellung der Fragen und Optionen-->
			<!--Dieses Div ist für die Multiple Choice Page-->
			<div class="w-full {showPollMultiple ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
					Multiple Choice Abstimmung erstellen
				</h3>
				<p class="w-fit ml-auto mr-auto">Abstimmung mit mehreren Optionen</p>
				<div class="ml-auto mr-auto w-fit flex flex-col">
					<Input id="question" label="Frage" placeholder="Warum ist PollToll so toll!!!" />
					<div class="divider" />
					{#each options as option, index}
						<Input
							id={index.toString()}
							label={'Option ' + (index + 1)}
							placeholder={'Option ' + (index + 1)}
						/>
					{/each}
					<div class="w-fit flex ml-auto mr-auto">
						<button type="button" on:click={removeOption} class="btn btn-secondary ml-auto mr-auto"
							>-</button
						>
						<button type="button" on:click={addOption} class="btn btn-secondary ml-auto mr-auto"
							>+</button
						>
					</div>
				</div>
				<div class="flex w-fit ml-auto mr-auto">
					<button
						type="button"
						on:click={() => {
							showPollVisibility = true;
							showPollMultiple = false;
						}}
						class="mt-5 btn btn-primary flex flex-col mr-2"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" /><span
								class="h-fit mt-auto mb-auto">Zurück</span
							></span
						></button
					>
					<button
						type="button"
						on:click={() => {
							showPollVisibility = false;
							showPollVisibility = false;
						}}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><span class="h-fit mt-auto mb-auto">Weiter</span>
							<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
						></button
					>
				</div>
			</div>
			<!--Dieses Div ist für die Ja/Nein Page-->
			<div class="w-full {showPollYesNo ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Ja/Nein Abstimmung erstellen</h3>
				<p class="w-fit ml-auto mr-auto">Abstimmung mit Ja/Nein Antworten oder Enthaltung</p>
				<div class="ml-auto mr-auto w-fit">
					<Input
						id="question"
						bind:value={question}
						label="Frage"
						placeholder="Ist PollToll toll?"
					/>
				</div>
				<div class="flex w-fit ml-auto mr-auto">
					<button
						type="button"
						on:click={() => {
							showPollVisibility = true;
							showPollYesNo = false;
						}}
						class="mt-5 btn btn-primary flex flex-col mr-2"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" /><span
								class="h-fit mt-auto mb-auto">Zurück</span
							></span
						></button
					>
					<button
						type="button"
						on:click={() => {
							showPollVisibility = false;
							showPollVisibility = false;
						}}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><span class="h-fit mt-auto mb-auto">Weiter</span>
							<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
						></button
					>
				</div>
			</div>
			<!--Dieses Div ist für die freie Antwort page-->
			<div class="w-full {showPollRandom ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
					Abstimmung mit freier Antwort erstellen
				</h3>
				<p class="w-fit ml-auto mr-auto">
					Abstimmung, bei der man eine beliebige Antwort abgeben darf.
				</p>
				<div class="ml-auto mr-auto w-fit">
					<Input id="question" label="Frage" placeholder="Warum ist PollToll so toll?!!" />
				</div>
				<div class="flex w-fit ml-auto mr-auto">
					<button
						type="button"
						on:click={() => {
							showPollVisibility = true;
							showPollRandom = false;
						}}
						class="mt-5 btn btn-primary flex flex-col mr-2"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" /><span
								class="h-fit mt-auto mb-auto">Zurück</span
							></span
						></button
					>
					<button
						type="button"
						on:click={() => {
							showPollRandom = false;
							showPollVariables = true;
						}}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><span class="h-fit mt-auto mb-auto">Weiter</span>
							<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
						></button
					>
				</div>
			</div>
			<div class="w-full {showPollVariables ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Abstimmungsvariablen</h3>
				<p class="w-fit ml-auto mr-auto">Einstellung von Abstimmungsvariablen</p>
				<div
					class="w-fit ml-auto mr-auto {pollType !== 'random' && showPollVariables
						? 'visible'
						: 'invisible h-0'}"
				>
					<label class="label cursor-pointer flex">
						<span class="label-text">Mehrheit Erforderlich</span>
						<input
							type="checkbox"
							class="toggle"
							on:click={() => {
								majority ? (majority = false) : (majority = true);
							}}
						/>
					</label>
					<div class="w-fit ml-auto mr-auto {majority ? 'visible' : 'invisible h-0'}">
						<div class="flex w-50">
							<label for="absolut">Absolute Mehrheit</label>
							<input type="radio" name="majority" id="absolut" value="absolut" class="ml-auto" />
						</div>
						<div class="flex">
							<label for="relativ">Relative Mehrheit</label>
							<input type="radio" name="majority" id="relativ" value="relativ" class="ml-auto" />
						</div>
						<div class="flex">
							<label for="simple">Einfache Mehrheit</label>
							<input type="radio" name="majority" id="simple" value="simple" class="ml-auto" />
						</div>
						<div class="flex">
							<label for="qualified">2/3 Mehrheit</label>
							<input
								type="radio"
								name="majority"
								id="qualified"
								value="qualified"
								class="ml-auto"
							/>
						</div>
					</div>
				</div>
			</div>
			<label class="ml-auto mr-auto">{error}</label>
			<button type="submit" class="btn btn-primary mr-auto ml-auto">Speichern</button>
		</form>
	</div>
</div>
