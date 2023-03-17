<script lang="ts">
	import type { Question } from "$lib/types";

    export let question: Question
</script>

<div class="mockup-window border-base-100 bg-base-300">
  <div class="flex justify-center px-4 pt-2 bg-base-200">
    <h3 class="text-xl font-bold">
        {question.question}
    </h3>
  </div>
</div>