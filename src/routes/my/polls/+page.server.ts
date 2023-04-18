import type { Poll } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUserPolls = async (userId: string) => {
		try {
			const polls = serializeNonPOJOs<Poll[]>(
				await locals.pb.collection('poll').getFullList(undefined, {
					filter: `hostIDFS = "${userId}"`
				})
			);
			return polls;
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
	};

	return {
		polls: getUserPolls(locals.user?.id as string)
	};
};

export const actions: Actions = {
	deleteProject: async ({ locals, request }) => {
		const { id } = Object.fromEntries(await request.formData()) as { id: string };

		try {
			await locals.pb.collection('poll').delete(id);
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
		return {
			success: true
		};
	}
};
