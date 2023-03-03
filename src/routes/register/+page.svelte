<script lang="ts">
	import { Input } from '$lib/components';
</script>

<div class="flex flex-col items-center h-full w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
				Registrieren Sie sich
			</h2>
			<p class="text-center mt-1">
				Oder <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
					>loggen Sie sich ein</a
				>, wenn Sie bereits einen Account haben.
			</p>
			<form
				action="?/register"
				method="POST"
				class="flex flex-col items-center space-y-2 w-full pt-4"
			>
				<Input id="name" label="Name" />
				<Input id="email" type="email" label="Email" />
				<Input id="password" type="password" label="Passwort" />
				<Input id="passwordConfirm" type="password" label="Passwort bestätigen" />
				<div class="w-full max-w-lg pt-2">
					<button type="submit" class="btn btn-primary w-full">Register</button>
				</div>
			</form>
		</div>
	</div>
</div>
