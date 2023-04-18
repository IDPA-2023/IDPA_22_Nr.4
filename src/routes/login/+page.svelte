<script lang="ts">
	import type { ActionData } from './$types';
	import { Input } from '$lib/components';
	import { toast } from 'svelte-french-toast';
	import { enhance, type SubmitFunction } from '$app/forms';
	export let form: ActionData;
	let loading = false;
	const submitLogin: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					toast.error('Ungülitge Email or Password');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col items-center h-hull w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
				Loggen Sie sich ein
			</h2>
			<p class="text-center mt-1">
				Oder <a
					href="/register"
					class="text-primary font-medium hover:cursor-pointer hover:underline"
					>registriren sie sich</a
				>, wenn Sie noch keinen Account haben.
			</p>
			<form
				action="?/login"
				method="POST"
				use:enhance={submitLogin}
				class="flex flex-col items-center space-y-2 w-full pt-4"
			>
				<Input
					id="email"
					type="email"
					label="Email"
					value={form?.data?.email ?? ''}
					errors={form?.errors?.email}
					disabled={loading}
				/>
				<Input
					id="password"
					type="password"
					label="Passwort"
					value={form?.data?.password}
					errors={form?.errors?.password}
					disabled={loading}
				/>
				<a
					href="/reset-password"
					class="text-primary font-medium hover:cursor-pointer hover:underline"
					>Passowort vergessen?</a
				>
				<div class="w-full max-w-md pt-2">
					<button type="submit" class="btn btn-primary w-full" disabled={loading}>Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
