<script lang="ts">
	import { Question } from "$lib/components";
    import type { PageData } from "./$types";

    export let data: PageData;
    console.log(data);
</script>

<div class="flex flex-col items-center h-full w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
            <div class="card-title">
                <h2 class="text-5xl">
                    {data.poll.name}
                </h2>
            </div>
            <p>{data.poll.description}</p>
        </div>
    </div>
    {#each data.questions as question}
        <div class="mt-5 w-full">
            <Question {question} />
        </div>
    {/each}
</div>