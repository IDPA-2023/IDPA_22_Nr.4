<script lang="ts">
	export let label: string;
	export let checked: boolean;
</script>

<label for={label}>
	<slot name="trigger" />
</label>

<input type="checkbox" id={label} class="modal-toggle" {checked} />

<label for={label} class="modal modal-bottom sm:modal-middle">
	<label class="modal-box">
		<div class="font-bold text-xl text-center text-primary-content">
			<slot name="heading" />
		</div>
		<div class="my-2">
			<slot />
		</div>
		<div class="modal-action justify-center">
			<slot name="actions" />
		</div>
	</label>
</label>
