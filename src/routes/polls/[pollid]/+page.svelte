<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="flex flex-col items-center h-full w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
            <div class="card-title">
                <h2>
                    {data.poll.name}
                </h2>
            </div>
            <p>{data.poll.description}</p>
        </div>
    </div>  
</div>