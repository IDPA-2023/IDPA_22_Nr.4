<script lang="ts">
	import type { User, Vote } from "$lib/types";

    export let votes: Vote[]

    let users = votes.map(vote => vote.expand.userIDFS as User)
</script>

<div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th>Abgestummen</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      {#each votes as vote, i}
        <tr>
          <td>{users[i].name}</td>
          <td>{vote.vote}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>