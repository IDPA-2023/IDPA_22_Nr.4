<script lang="ts">
	interface $$Props extends Partial<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['input']>> {
		id: string;
		label: string;
		value?: string;
		placeholder?: string;
		type?: string;
		disabled?: boolean;
		required?: boolean;
	}
	export let value = '';
	export let placeholder = '';
	export let id: string;
	export let label: string;
	export let type: string = 'text';
	export let disabled: boolean = false;
	export let required: boolean = false;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		class={type === 'file'
			? 'file-input file-input-bordered w-full max-w-lg'
			: 'input input-bordered w-full max-w-lg'}
		{type}
		{placeholder}
		{disabled}
		{required}
		name={id}
		{value}
	/>
</div>