<script lang="ts">
	import { Icon, ChevronRight, ChevronLeft } from 'svelte-hero-icons';
	import type { PageData } from './$types';

	export let data: PageData;

	let name: string = '';
	let description: string = '';
	let showPollVisibility: boolean;
	let showPollVariables: boolean;
	$: pollVisibility = '';
	$: description = '';
	$: showPollVisibility = true;
	$: showPollVariables = false;

	let error = '';
	$: error = '';

	const changePageVisibility = () => {
		showPollVisibility = false;
		showPollVariables = true;
	};

	const changePageVisibilityBack = () => {
		showPollVisibility = true;
		showPollVariables = false;
	};
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/addPoll" method="post">
			<div class="w-full pt-10 {showPollVisibility ? 'visible' : 'invisible h-0'}">
				<h3 class="font-medium text-2xl w-fit ml-auto mr-auto">
					Öffentliche oder private Abstimmung?
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
						<div class="w-full max-w-sm ml-auto mr-auto mb-2 flex flex-col">
							<label for="title" class="label font-medium pb-1">
								<span class="label-text">Öffentlich oder Privat?</span>
							</label>
							<select
								class="select select-primary w-full ml-auto mr-auto"
								bind:value={pollVisibility}
								on:change={() => console.log(pollVisibility)}
							>
								<option disabled selected value="">Öffentlich oder Privat?</option>
								<option value="public">Öffentlich</option>
								<option value="privateLink">Privat mit Einladungslink</option>
								<option value="privateUsers">Privat mit Login</option>
							</select>
							<input
								type="hidden"
								name="pollVisibility"
								id="pollVisibility"
								value={pollVisibility}
							/>
							{#if pollVisibility === 'public'}
								<div class="alert alert-info shadow-lg mt-5">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											class="stroke-current flex-shrink-0 w-6 h-6"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/></svg
										>
										<span>Jedermann darf an dieser Abstimmung teilnehmen</span>
									</div>
								</div>
							{:else if pollVisibility === 'privateLink'}
								<div class="alert alert-info shadow-lg mt-5">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											class="stroke-current flex-shrink-0 w-6 h-6"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/></svg
										>
										<span
											>Alle Personen, welche Zugriff auf den Einladungslink und Code haben, können
											an der Abstimmung teilnehmen</span
										>
									</div>
								</div>
							{:else if pollVisibility === 'privateUsers'}
								<div class="alert alert-info shadow-lg mt-5">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											class="stroke-current flex-shrink-0 w-6 h-6"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/></svg
										>
										<span
											>Nur Personen, welche ein Benutzerkonto haben und eingeladen wurden, sei es
											als Mitglied einer Gruppe oder individuell, dürfen an dieser Abstimmung
											teilnehmen</span
										>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<button
					type="button"
					on:click={() => {
						changePageVisibility();
					}}
					class=" ml-auto mr-auto mt-5 btn btn-primary flex flex-col buttonWeiter"
					name="buttonWeiter"
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
					<div class="w-80 flex flex-col mr-auto ml-auto">
						<label for="radioRel" class="w-full flex mb-5"
							>2/3 aller abgegebenen Stimmen sind notwendig. Enthaltungen werden nicht
							berücksichtigt<input
								type="radio"
								name="radioMehr"
								id="twothirdMajority"
								class="radio bg-black ml-auto"
								value="zweiDrittelMajority"
								checked
								required
							/></label
						>
						{#if pollVisibility === 'privateUsers'}
							<label for="radioAbs" class="w-full flex mb-5"
								>Die Stimmen müssen um 1 über die Hälfte aller abgegebenen Stimmen liegen. (Absolute
								Mehrheit)<input
									type="radio"
									name="radioMehr"
									id="radioAbs"
									class="radio bg-black ml-auto"
									value="absMajority"
									required
								/></label
							>
						{/if}
						<label for="radioEinfach" class="w-full flex mb-5"
							>Es genügt die Mehrheit der abgegebenen Stimmen, dabei werden die Enthaltungen nicht
							berücksichtigt.<input
								type="radio"
								name="radioMehr"
								id="radioEinfach"
								class="radio bg-black ml-auto"
								value="relMajority"
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
							changePageVisibilityBack();
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
