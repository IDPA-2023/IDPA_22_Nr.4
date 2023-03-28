<script lang="ts">
    import Input from "$lib/components/Input.svelte";
</script>

<div class="w-full h-full mt-5">
    <h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Gruppe erstellen</h3>
    <form action="'?/getUserByUsername" method="post">
        <div class="w-fit mr-auto ml-auto flex">
            <Input type="text" name="username" required={true} label="Benutzername des einzuladenen Benutzers" id="username"/>
            <button type="submit" class="w-fit btn btn-primary ml-px mb-2 mt-auto">+</button>
        </div>
    </form>

    <h3 class="font-medium text-2xl w-fit ml-auto mr-auto">Bereits hinzugefügte Benutzer</h3>

</div>

