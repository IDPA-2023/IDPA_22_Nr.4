<script lang="ts">
	let options: string[];
	$: options = ['', ''];

	let error: string;

	$: error = '';

	const addOption = () => {
		options[options.length] = '';
	};

	const removeOption = () => {
		if (options.length >= 3) {
			options.pop();
			options = options;
			console.log(options);
		} else {
			console.log('error');
			error = 'Sie dürfen nicht weniger als 2 Optionen angeben';
		}
		error = error;
	};
</script>

<!--Ab hier kommen die Divs für die Erstellung der Fragen und Optionen-->
<!--Dieses Div ist für die Multiple Choice Page-->
<div class="w-full {showPollMultiple ? 'visible' : 'invisible h-0'}">
	<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Multiple Choice Abstimmung erstellen</h3>
	<p class="w-fit ml-auto mr-auto">Abstimmung mit mehreren Optionen</p>
	<div class="card w-full max-w-fit bg-base-100 shadow-xl ml-auto mr-auto">
		<div class="card-body ml-auto mr-auto">
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
		<Input id="question" bind:value={question} label="Frage" placeholder="Ist PollToll toll?" />
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
	<p class="w-fit ml-auto mr-auto">Abstimmung, bei der man eine beliebige Antwort abgeben darf.</p>
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
				<input type="radio" name="majority" id="qualified" value="qualified" class="ml-auto" />
			</div>
		</div>
	</div>
</div>
