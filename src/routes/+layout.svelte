<script lang="ts">
	import '../app.postcss';
	import { Navbar } from '$lib/components';
	import type { PageData } from './$types';
	import { Toaster } from 'svelte-french-toast';
	import type { User } from '$lib/types';
	export let data: PageData;
	let user: User | undefined;

	$: user = data?.user;
</script>

<Toaster />
<div class="from-primary to-secondary min-h-full bg-gradient-to-br p-4">
	<Navbar {user} />
	<div class="py-4">
		<div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-full">
			<slot />
		</div>
	</div>
</div>
