<script lang="ts">
	import { Icon, Pencil } from 'svelte-hero-icons';
	import { Input } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';

	export let data;
	let loading: boolean;

	$: loading = false;

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview');
			preview.src = src;
		}
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full ml-auto mr-auto">
	<form
		action="?/updateProfile"
		method="POST"
		class="flex flex-col space-y-2 w-fit ml-auto mr-auto"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<h3 class="text-2xl font-medium ml-auto mr-auto">Profileinstellungen anpassen</h3>
		<div class="form-control w-fit max-w-lg ml-auto mr-auto">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text text-center ml-auto mr-auto">Profilbild</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<!--<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
                <span class="btn btn-circle btn-sm btn-secondary">
                    <Icon src={Pencil} />
                </span>
            </label>-->
				<div class="w-32 rounded-full">
					<img
						src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar, '80x80')
							: `https://ui-avatars.com/api/?name=${data?.user?.name}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
				<div class="w-10 p-2 rounded-full absolute btn-secondary top-0 right-0">
					<Icon src={Pencil} />
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
		</div>
		<Input id="name" label="Name" value={data?.user?.name} disabled={loading} />
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
				Einstellungen speichern
			</button>
		</div>
	</form>
</div>
