<script lang="ts">
	import type { Poll, User } from '$lib/types';
	import { Icon, PencilSquare, Share } from 'svelte-hero-icons';
	import Modal from './Modal.svelte';
	import Input from './Input.svelte';

	export let poll: Poll;
	export let user: User | undefined;

	let shareModalOpen : boolean

	$: shareModalOpen = false
</script>

<div class="card px-3 sm:mx-0 sm:w-72 bg-base-100 shadow-xl w-full max-h-96">
	<div class="card-body">
		<h2 class="card-title">{poll.name}</h2>
		<p>{poll.description}</p>
		<div class="card-actions justify-end mt-2">
			<a href={`/polls/${poll.id}`} class="btn btn-primary w-full">Resultate anschauen</a>
			<a href={`/polls/${poll.id}/questions/vote`} class="btn btn-secondary w-full">Abstimmen</a>
		</div>
	</div>
	{#if poll.public || (poll.hostIDFS === user?.id)}
		{#if (poll.require_login === true) && (poll.hostIDFS === user?.id)}
		<div class="w-10 p-2 rounded-full absolute btn-secondary -top-3 right-8 cursor-pointer">
			<a href="/polls/{poll.id}/invite"><Icon src={Share}/></a>
		</div>
		{:else}
		<div class="w-10 p-2 rounded-full absolute btn-secondary -top-3 right-8 cursor-pointer">
			<Modal label="share" checked={shareModalOpen}>
				<span slot="trigger"><Icon src={Share}/></span>
				<h3 slot="heading">Abstimmung teilen</h3>
				<p>Hier können Sie den Link für die Abstimmung kopieren</p>
				<Input label="Link zur Abstimmung" id="pollLink" name="pollLink" disabled={true} value={`https://polltoll.vercel.app/polls/${poll.id}/questions/vote`}/>
			</Modal>
		</div>
		{/if}
	{/if}
	{#if poll.hostIDFS === user?.id}
		<div class="w-10 p-2 rounded-full absolute btn-secondary -top-3 -right-3 cursor-pointer">
			<a href={`/polls/${poll.id}/edit`}><Icon src={PencilSquare} /></a>
		</div>
	{/if}
</div>
