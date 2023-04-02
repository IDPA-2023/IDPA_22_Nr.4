<script lang="ts">
	import { Icon, Trash } from "svelte-hero-icons";
	import type { PageData } from "./$types";

    export let data : PageData
    console.log(data.userData)
</script>

<div class="w-full">
    <form action="?/editGroup" method="post" class="flex flex-col">
    {#if data.group}
    <h3 class="font-medium text-2xl w-fit ml-auto mr-auto mt-5">{data.group.name} bearbeiten</h3>
    <div class="form-control w-full max-w-lg mb-2 ml-auto mr-auto">
        <label for="groupName" class="label font-medium pb-1">
            <span class="label-text">Name der Gruppe</span>
        </label>
        <input class='input input-bordered w-full max-w-lg' value={data.group.name} id="groupName" name="groupName" />
    </div>
    {/if}
    {#if data.userData}
    <h4 class="text-xl w-fit font-medium ml-auto mr-auto mt-12">Mitglieder</h4>
    {#each data.userData.users as user, idx}
    <div class="card w-4/5 bg-base-100 shadow-xl ml-auto mr-auto mt-5">
        <div class="card-body">
            <div class="flex w-full">
                <div class="flex flex-col">
                    <h2 class="card-title">{user.username}</h2>
                    <p>{user.name}</p>
                </div>
                <div class="w-fit flex ml-auto">
                    <div class="flex w-fit flex-col mr-2">
                        <p class="text-xs mb-2">Gewichtung: </p>
                        <input type="number" class="input input-bordered w-28" name={"weight"+idx} id={"weight"+idx} value={data.userData.userGroups[idx].weight} />
                    </div>
                    <form action="?/deleteUser" method="post" class="flex">
                        <input type="hidden" name="userId" value={user.id}>
                        <button class="btn btn-secondary btn-circle w-12 p-2 ml-2 mb-auto mt-auto"><Icon src={Trash}></Icon></button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    {/each}
    {/if}
    <button type="submit" class="btn-primary btn w-fit ml-auto mr-auto mt-5">Änderungen Speichern</button>
    </form>
</div>
