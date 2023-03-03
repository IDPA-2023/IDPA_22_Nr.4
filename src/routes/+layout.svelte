<script lang="ts">
    import '../app.postcss';
    import { Navbar } from "$lib/components";
	import type { PageData } from './$types';
    export let data: PageData;

    const { user } = data;
</script>

<div class="h-full from-primary to-secondary bg-gradient-to-br p-4">
    <Navbar {user}/>
    <div class="py-4">
        <slot />
    </div>
</div>