<script lang="ts">
	import { Input } from "$lib/components";
	import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";
	import type { PageData } from "./$types";


	let showPollMultiple : boolean
	let showPollRandom : boolean
	let showPollYesNo : boolean
	let showPollType : boolean

	$:showPollMultiple = false
	$:showPollRandom = false
	$:showPollYesNo = false 
	$: showPollType = true

	let options: string[];
	let question: string;
	let pollType : string;
	$: options = ['', ''];
	$: question = '';
	$: pollType = 'multiple'

	let error: string;

	$: error = '';

	const addOption = () => {
		options[options.length] = '';
	};

	const removeOption = () => {
		if (options.length >= 3) {
			options.pop();
			options = options;
		} else {
			error = 'Sie dürfen nicht weniger als 2 Optionen angeben';
		}
		error = error;
	};

	const changePageType = () => {
		showPollType = false

		if(pollType === 'random'){
			showPollRandom = true
		}else if(pollType === 'multiple'){
			showPollMultiple = true
		}else if(pollType === 'yesNo'){
			showPollYesNo = true
		}
		error = '';
	};

</script>
<div class="w-full">
	<form action="?/addQuestion" method="post" class="flex flex-col">
		<div class="w-full {showPollType ? 'visible' : 'invisible h-0'}">
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
		
		<!--Ab hier kommen die Divs für die Erstellung der Fragen und Optionen-->
		<!--Dieses Div ist für die Multiple Choice Page-->
		{#if showPollMultiple}
		<div class="w-full">
			<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Multiple Choice Abstimmung erstellen</h3>
			<p class="w-fit ml-auto mr-auto">Abstimmung mit mehreren Optionen</p>
			<div class="card w-full max-w-fit bg-base-100 shadow-xl ml-auto mr-auto">
				<div class="card-body ml-auto mr-auto">
					<div class="ml-auto mr-auto w-fit flex flex-col">
						<Input id="question" label="Frage" placeholder="Warum ist PollToll so toll!!!" required={true}/>
						<div class="divider" />
						{#each options as option, index}
							<Input
								id={'option'+index.toString()}
								value={option}
								label={'Option ' + (index + 1)}
								placeholder={'Option ' + (index + 1)}
								required={true}
							/>
						{/each}
						<div class="w-fit flex ml-auto mr-auto">
							<button type="button" on:click={removeOption} class="btn btn-secondary ml-auto mr-2"
								>-</button
							>
							<button type="button" on:click={addOption} class="btn btn-secondary ml-auto mr-auto"
								>+</button
							>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full flex">
				<div class="flex w-fit ml-auto mr-5">
					<button
						type="button"
						on:click={() => {
							showPollMultiple = false;
							showPollType = true
						}}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" />
							<span class="h-fit mt-auto mb-auto">Zurück</span>
							</span>
							</button
					>
					<button type="submit" class="btn btn-primary ml-auto mr-auto w-fit mt-5">Speichern</button>
				</div>
				
			</div>
		</div>
		{/if}
		
		{#if showPollYesNo}
		<!--Dieses Div ist für die Ja/Nein Page-->
		<div class="w-full">
			<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Ja/Nein Abstimmung erstellen</h3>
			<p class="w-fit ml-auto mr-auto">Abstimmung mit Ja/Nein Antworten oder Enthaltung</p>
			<div class="ml-auto mr-auto w-fit">
				<Input id="question" bind:value={question} label="Frage" placeholder="Ist PollToll toll?" required={true}/>
			</div>
			<div class="w-full flex">
				<div class="flex w-fit ml-auto mr-5">
					<button
						type="button"
						on:click={() => {
							showPollYesNo = false;
							showPollType = true
						}}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" />
							<span class="h-fit mt-auto mb-auto">Zurück</span>
							</span>
							</button
					>
					<button type="submit" class="btn btn-primary ml-auto mr-auto w-fit mt-5">Speichern</button>
				</div>
			</div>
		</div>
		{/if}

		{#if showPollRandom}
		<!--Dieses Div ist für die freie Antwort page-->
		<div class="w-full">
			<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
				Abstimmung mit freier Antwort erstellen
			</h3>
			<p class="w-fit ml-auto mr-auto">Abstimmung, bei der man eine beliebige Antwort abgeben darf.</p>
			<div class="ml-auto mr-auto w-fit">
				<Input id="question" label="Frage" placeholder="Warum ist PollToll so toll?!!" required={true}/>
			</div>
			<div class="w-full flex">
				<div class="flex w-fit ml-auto mr-5">
					<button
						type="button"
						on:click={() => {
							showPollRandom = false;
							showPollType = true
						}}
						class="mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" />
							<span class="h-fit mt-auto mb-auto">Zurück</span>
							</span>
							</button
					>
					<button type="submit" class="btn btn-primary ml-auto mr-auto w-fit mt-5">Speichern</button>
				</div>
			</div>
		</div>
		{/if}

	</form>
</div>

	
