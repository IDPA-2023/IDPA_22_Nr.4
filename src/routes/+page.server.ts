import type { Poll, UserGroup } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import type { ClientResponseError } from 'pocketbase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	const getPolls = async () => {
		try {
			const userGroup = serializeNonPOJOs<UserGroup[]>(
				await locals.pb.collection('userGroup').getFullList({
					filter: `userIDFS = '${locals.user?.id}'`
				})
			);
			let polls: Poll[] = [];
			if (userGroup.length === 0) {
				polls = serializeNonPOJOs<Poll[]>(
					await locals.pb.collection('poll').getFullList({
						filter: `public = true`
					})
				);
				return polls;
			}
			for (const group of userGroup) {
				polls.push(
					...serializeNonPOJOs<Poll[]>(
						await locals.pb.collection('poll').getFullList({
							filter: `public = true || groupIDFS = '${group.groupIDFS}'`
						})
					)
				);
			}
			return polls.filter(
				(thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
			);
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	return {
		polls: getPolls()
	};
};
