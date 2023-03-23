import type { Poll } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import type { ClientResponseError } from 'pocketbase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	const getPolls = async () => {
		try {
			const polls = serializeNonPOJOs<Poll[]>(
				await locals.pb.collection('poll').getFullList({
					filter: 'public = true'
				})
			);
			return polls;
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	return {
		polls: getPolls()
	};
};
