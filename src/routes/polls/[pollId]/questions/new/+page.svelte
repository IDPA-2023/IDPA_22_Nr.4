<script lang="ts">
	import { Input } from "$lib/components";
	import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";
	import type { PageData } from "./$types";


	let showPollMultiple : boolean = false
	let showPollRandom : boolean = false
	let showPollYesNo : boolean = false
	let showPollType : boolean = true

	let options: string[] = ['', '']
	let question: string = ''
	let pollType : string = "multiple"

	let error: string = ''

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
		}else if((pollType === 'multiple') || (pollType === 'select')){
			showPollMultiple = true
		}else if(pollType === 'yesNo'){
			showPollYesNo = true
		}
		error = '';
	};

	export let data : PageData

</script>
<div class="w-full">
	<form action="?/addQuestion" method="post" class="flex flex-col">
		<div class="w-full {showPollType ? 'visible' : 'invisible h-0'}">
			<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Abstimmungsart auswählen</h3>
			<p class="w-fit ml-auto mr-auto">Welche Art von Abstimmung soll es werden?</p>
			<div class="ml-auto mr-auto w-fit mt-5">
				<select class="select select-primary w-full ml-auto mr-auto" bind:value={pollType}>
					<option disabled selected value="">Abstimmungstyp (Multiple Choice, Ja/ Nein, ...)</option>
					<option value="multiple">Multiple Choice</option>
					<option value="select">Select</option>
					<option value="yesNo">Ja/ Nein</option>
					<option value="random">Freie Antwort</option>
				</select>
				<input type="hidden" name="pollType" id="pollType" value={pollType} />
				{#if pollType === "multiple"}
							<div class="alert alert-info shadow-lg mt-5 max-w-md">
								<div>
								  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								  <span>Eine oder mehrere Optionen dürfen ausgewählt werden.</span>
								</div>
							  </div>
							{:else if pollType === "select"}
							<div class="alert alert-info shadow-lg mt-5 max-w-md">
								<div>
								  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								  <span>Eine von mehreren Optionen darf ausgewählt werden.</span>
								</div>
							  </div>
							{:else if pollType === "random"}
							<div class="alert alert-info shadow-lg mt-5 max-w-md">
								<div>
								  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								  <span>Eine Freie Antwort kann eingegeben werden.</span>
								</div>
							  </div>
							  {:else if pollType === "yesNo"}
							  <div class="alert alert-info shadow-lg mt-5 max-w-md">
								  <div>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
									<span>Es dürfen lediglich die Optionen Ja und Nein gewählt werden. Wenn nichts ausgewählt wird, dann zählt es als eine Enthaltung.</span>
								  </div>
								</div>
							{/if}
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
			<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Multiple Choice / Select Abstimmung erstellen</h3>
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
				<div class="flex w-fit ml-auto mr-auto">
					<button
						type="button"
						on:click={() => {
							showPollMultiple = false;
							showPollType = true
						}}
						class="mt-5 btn btn-primary flex flex-col mr-2"
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
				<div class="flex w-fit ml-auto mr-auto">
					<button
						type="button"
						on:click={() => {
							showPollYesNo = false;
							showPollType = true
						}}
						class="mt-5 btn btn-primary flex flex-col mr-2"
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
				<div class="flex w-fit ml-auto mr-auto">
					<button
						type="button"
						on:click={() => {
							showPollRandom = false;
							showPollType = true
						}}
						class="mt-5 btn btn-primary flex flex-col mr-2"
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

	
