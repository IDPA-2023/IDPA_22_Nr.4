<script lang="ts">
	import type { Question, User, Vote } from "$lib/types";

  export let question: Question
  export let votes: Vote[]

  let users = votes.map(vote => vote.expand.userIDFS as User)
</script>

<div class="mockup-window border-base-100 bg-base-300">
  <div class="flex justify-center px-4 pt-2 bg-base-200">
    <h3 class="text-xl font-bold">
        {question.question}
    </h3>
  </div>
  <div class="p-3 bg-base-200">
    {#each votes as vote, i}
      <p>{vote.vote}</p>
      <p>{users[i].name}</p>
    {/each}
  </div>
</div>