<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { getCurrentTheme } from '$lib/utils';
	import { onMount } from 'svelte';
	let currentTheme: string | null;
	$: currentTheme = null;
	onMount(() => {
		currentTheme = getCurrentTheme();
	});
	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		currentTheme = action.searchParams.get('theme');
		if (currentTheme) {
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	};
	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Theme</h3>
		<div class="divider" />
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1 z-50">
				<li>
					<button> Set Theme 🎨 </button>
					<ul class="p-2 bg-base-100 w-full max-h-96 overflow-y-scroll">
						<form method="POST" use:enhance={submitUpdateTheme}>
							{#each themes as theme}
								<li>
									<button
										class={currentTheme === theme ? 'active' : ''}
										formaction="?/setTheme&theme={theme}">{theme}</button
									>
								</li>
							{/each}
						</form>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>
