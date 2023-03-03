<script lang="ts">
    import '../app.postcss';
    import { Navbar } from "$lib/components";
	import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
	import type { User } from '$lib/types';
    export let data: PageData;
    let user: User | undefined;

    $: user = data?.user;
</script>

<Toaster />
<div class="h-full from-primary to-secondary bg-gradient-to-br p-4">
    <Navbar {user}/>
    <div class="py-4">
        <slot />
    </div>
</div>