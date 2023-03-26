<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const handleSelect = (e) => {
		console.log(e.target.id)
	}
</script>

<div class="flex flex-col items-center h-hull w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">{data.question.question}</h2>
			<form method="post" action="?/createVote">
				<div class="flex flex-col">
							<input type="button" on:click={handleSelect} value={"Ja"} class="btn btn-secondary btn-outline w-full mt-2"/>
							<input type="button" on:click={handleSelect} value={"Nein"} class="btn btn-secondary btn-outline w-full mt-2"/>
				</div>
			</form>
		</div>
	</div>
</div>