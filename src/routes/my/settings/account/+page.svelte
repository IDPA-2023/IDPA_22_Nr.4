<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, Modal } from '$lib/components';
	export let form: any;
	export let data: any;
	let emailModalIsOpen: boolean;
	let userNameModalIsOpen: boolean;
	let loading: boolean;

	$: emailModalIsOpen = false;
	$: userNameModalIsOpen = false;
	$: loading = false;

	const submitUpdateEmail = () => {
		loading = true;
		emailModalIsOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					console.log('success');
					await invalidateAll();
					emailModalIsOpen = false;
					break;
				case 'error':
					break;
				default:
					console.log('default');
					await applyAction(result);
			}
		};
	};

	const submitUpdateUsername = () => {
		loading = true;
		userNameModalIsOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					userNameModalIsOpen = false;
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
		};
	};
</script>

<div class="flex flex-col w-fit h-full space-y-12 ml-auto mr-auto">
	<div class="w-full">
		<h3 class="text-2xl font-medium">E-mail Adresse ändern</h3>
		<div class="divider" />
		<Modal label="change-email" checked={emailModalIsOpen}>
			<div class="w-full flex" slot="trigger">
				<span class="btn btn-primary ml-auto mr-auto">E-mail Adresse ändern</span>
			</div>
			<h3 slot="heading">Änderung der E-mail Adresse</h3>
			<form action="?/updateEmail" method="POST" class="space-y-2">
				<Input
					id="newEmail"
					type="email"
					label="Geben Sie hier Ihre neue E-mail Adresse ein"
					required={true}
					value={form?.data?.email}
					disabled={loading}
				/>
				<button type="submit" class="btn btn-primary w-full" disabled={loading}
					>Neue E-mail Adresse speichern</button
				>
			</form>
		</Modal>
	</div>
	<div class="w-full">
		<h3 class="text-2xl font-medium">Benutzername ändern</h3>
		<div class="divider" />
		<Input id="username" label="Benutzername" value={data?.user?.username} disabled />
		<Modal label="change-username" checked={userNameModalIsOpen}>
			<div class="w-full flex" slot="trigger">
				<span class="btn btn-primary ml-auto mr-auto">Benutzername ändern</span>
			</div>
			<h3 slot="heading">Änderung des Benutzernamen</h3>
			<form
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateUsername}
			>
				<Input
					id="username"
					type="text"
					label="Geben Sie Ihren neuen Benutzernamen ein"
					required={true}
					value={form?.data?.username}
					disabled={loading}
				/>
				<button type="submit" class="btn btn-primary w-full mt-10" disabled={loading}
					>Benutzername ändern</button
				>
			</form>
		</Modal>
	</div>
</div>
