
<script lang="ts">
	import type { Question } from "$lib/types";
	import type { PageData } from "./$types";

    export let data : PageData

    console.log(data.pollId)
</script>

<div class="w-full mt-5 flex">
    <a href="/polls/{data.pollId}/questions/new" class="btn btn-primary">Neue Frage hinzufügen</a>
</div>

<!--{#each data.questions as question}
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{question.question}</h2>
            <p>Art: {question.type}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Bearbeiten</button>
            </div>
        </div>
    </div>
{/each}-->


