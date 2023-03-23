<script lang="ts">
	import type { PageData } from "./$types";


	export let data: PageData
</script>
<div class="flex flex-col items-center h-hull w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
				
			</h2>
			<form method="post" action="?/createvote">
			<div class="flex flex-col">
				{#each data.values.optionList as option}
					<button id={option.option}>{option.option}</button>
				{/each}
			</div>
			<button type="submit">weiter</button>
			</form>
				
		</div>
	</div>
</div>
