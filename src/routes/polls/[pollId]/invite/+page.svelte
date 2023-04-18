<script lang="ts">
	import type { PageData } from "./$types";
    import Input from "$lib/components/Input.svelte";

    export let data: PageData
    console.log(data.poll.groupIDFS)

    let groupID : string

    if(data.poll.groupIDFS){
        groupID = data.poll.groupIDFS
    }
    console.log(data.groups)
</script>

<div class="w-full flex flex-col">
    <h2 class="text-3xl font-bold ml-auto mr-auto">Abstimmung teilen</h2>
    {#if !data.poll.groupIDFS}
    <h3 class="text-2xl ml-auto mr-auto mt-5">Gruppe einladen</h3>
    {:else}
    <h3 class="text-2xl ml-auto mr-auto mt-5">Gruppe ändern</h3>
    <p class="ml-auto mr-auto">Alle schon gemachte Abstimmungen werden gelöscht!!!</p>
    <form action="?/changeGroup">

    </form>
    {/if}
    <select class="select select-primary ml-auto mr-auto mt-2 w-80" bind:value={groupID} on:change={() => console.log(groupID)}>
        <option disabled selected value="">Gruppe auswählen</option>
        {#each data.groups as group}
        <option value={group.id}>{group.name}</option>
        {/each}
    </select>
    <form action="?/changeGroup" method="post" class="ml-auto mr-auto flex mt-5">
        <input type="hidden" name="groupId" id="groupId" value={groupID}>
        <button type="submit" class="btn btn-primary ml-auto mr-auto">Änderungen speichern</button>
    </form>
</div>

