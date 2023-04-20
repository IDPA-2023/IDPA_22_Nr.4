import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { serializeNonPOJOs } from '$lib/utils';
import type { Group, Vote } from '$lib/types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	const poll = serializeNonPOJOs(
		await locals.pb.collection('poll').getOne(params.pollId as string)
	);
	let group;
	let userGroups;

	if (locals.user) {
		if (!locals.user.id === poll.hostIDFS) {
			throw redirect(303, '/login');
		}
	}

	if (poll.groupIDFS) {
		group = serializeNonPOJOs(await locals.pb.collection('group').getOne(poll.groupIDFS as string));
		if (group.name === poll.id) {
			userGroups = serializeNonPOJOs(
				await locals.pb
					.collection('userGroup')
					.getList(1, 50, { filter: `groupIDFS="${group.id}"` })
			);
		}
	}

	const userGroupCurrentUser = serializeNonPOJOs(
		await locals.pb
			.collection('userGroup')
			.getList(1, 50, { filter: `userIDFS="${locals.user?.id}"` })
	);

	let groups: Group[] = [];
	for (let i = 0; i < userGroupCurrentUser.items.length; i++) {
		const newGroup = serializeNonPOJOs<Group>(
			await locals.pb.collection('group').getOne(userGroupCurrentUser.items[i].groupIDFS)
		);
		groups.push(newGroup);
	}

	return {
		poll: poll,
		group: group,
		userGroups: userGroups,
		groups: groups
	};
};

export const actions: Actions = {
	changeGroup: async ({ locals, request, params }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const pollData = {
				groupIDFS: data.groupId as string
			};
			const oldPoll = await locals.pb.collection('poll').getOne(params.pollId as string);

			if (oldPoll.groupId === undefined) {
				const votes = serializeNonPOJOs<Vote[]>(
					await locals.pb.collection('vote').getFullList(200)
				);

				for (let i = 0; i < votes.length; i++) {
					const question = serializeNonPOJOs(
						await locals.pb.collection('question').getOne(votes[i].questionIDFS)
					);
					if (question.pollIDFS === params.pollId) {
						const deletedVote = serializeNonPOJOs(
							await locals.pb.collection('vote').delete(votes[i].id)
						);
					}
				}
			}

			const poll = await locals.pb.collection('poll').update(params.pollId as string, pollData);
		} catch (err) {
			console.log(err);
		}
	}
};
