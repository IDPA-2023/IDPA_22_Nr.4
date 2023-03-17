<script lang="ts">
	import type { Question, User, Vote } from "$lib/types";
	import { Chart, Table } from "$lib/components";

  export let question: Question
  export let votes: Vote[]
</script>

<div class="mockup-window border-base-100 bg-base-300">
  <div class="flex justify-center px-4 pt-2 bg-base-200">
    <h3 class="text-xl font-bold">
        {question.question}
    </h3>
  </div>
  <div class="p-3 bg-base-200">
    {#if question.type === "modal" || question.type === "select" || question.type === "checkbox"}
      <Chart />
    {:else}
      <Table {votes} />
    {/if}
  </div>
</div>