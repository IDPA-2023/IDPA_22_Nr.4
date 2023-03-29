<script lang="ts">
	import { Icon, ChevronRight, ChevronLeft } from 'svelte-hero-icons';
	import { boolean } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;

	let name: string = '';
	let description: string = '';
	let showPollVisibility: boolean;
	let showPollVariables: boolean;
	$: pollVisibility = 'public';
	$: description = '';
	$: showPollVisibility = true;
	$: showPollVariables = false;

	let error = '';
	$: error = '';
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/addPoll" method="post">
			<div class="w-full pt-10 {showPollVisibility ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
					Abstimmungssichtbarkeit auswählen
				</h3>
				<p class="w-fit ml-auto mr-auto">Wer soll an der Abstimmung teilnehmen dürfen?</p>
				<div class="ml-auto mr-auto w-fit mt-5">
					<div class="ml-auto mr-auto w-fit">
						<div class="w-full max-w-lg ml-auto mr-auto mb-2">
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
						<div class="w-full max-w-lg ml-auto mr-auto mb-2">
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
				</div>
				<button
					type="button"
					on:click={() => {
						showPollVisibility = false;
						showPollVariables = true;
					}}
					class=" ml-auto mr-auto mt-5 btn btn-primary flex flex-col"
					><span class="flex text-center btn-md"
						><span class="h-fit mt-auto mb-auto">Weiter</span>
						<Icon src={ChevronRight} size="32" class="mt-auto mb-auto" /></span
					></button
				>
			</div>
			<div class="w-full pt-5 {showPollVariables ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Abstimmungsvariablen</h3>
				<p class="w-fit ml-auto mr-auto">Weitere Einstellungen für die Abstimmung</p>

				<div class="w-full flex flex-col mt-5">
					<h4 class="font-bold ml-auto mr-auto">Erforderliche Mehrheit</h4>
					<div class="w-40 flex flex-col mr-auto ml-auto">
						<label for="radioRel" class="w-full flex"
							>Relative Mehrheit<input
								type="radio"
								name="radioMehr"
								id="radioRel"
								class="radio bg-black ml-auto"
								value="relMajority"
								checked
								required
							/></label
						>
						<label for="radioAbs" class="w-full flex"
							>Absolute Mehrheit<input
								type="radio"
								name="radioMehr"
								id="radioAbs"
								class="radio bg-black ml-auto"
								value="absMajority"
								required
							/></label
						>
						<label for="radioEinfach" class="w-full flex"
							>Einfache Mehrheit<input
								type="radio"
								name="radioMehr"
								id="radioEinfach"
								class="radio bg-black ml-auto"
								value="simpleMajority"
								required
							/></label
						>
					</div>
					<div class="w-64 ml-auto mr-auto mt-5">
						<label class="ml-auto mr-auto mt-5 w-full flex flex-col"
							>Anfangsdatum <input type="date" name="startdate" id="startdate" required /></label
						>
						<label class="ml-auto mr-auto mt-2 w-full flex flex-col"
							>Enddatum <input type="date" name="enddate" id="enddate" required /></label
						>
					</div>
				</div>

				<div class="w-full flex">
					<button
						type="button"
						on:click={() => {
							showPollVisibility = true;
							showPollVariables = false;
						}}
						class=" ml-auto mr-auto mt-5 btn btn-primary flex flex-col"
						><span class="flex text-center btn-md"
							><Icon src={ChevronLeft} size="32" class="mt-auto mb-auto" />
							<span class="h-fit mt-auto mb-auto">Zurück</span>
						</span></button
					>
					<button type="submit" class="btn btn-primary mr-auto ml-auto w-fit mt-5"
						>Abstimmung Speichern</button
					>
				</div>
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
		</form>
	</div>
</div>
