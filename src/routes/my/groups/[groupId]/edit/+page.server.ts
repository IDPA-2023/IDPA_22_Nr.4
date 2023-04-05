import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

let users = [];

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getGroup = async (groupId: string) => {
		try {
			const group = serializeNonPOJOs(await locals.pb.collection('group').getOne(groupId));

			if (locals.user) {
				if (!(group.hostIDFS === locals.user.id)) {
					throw error(400, 'Access Denied!!!');
				}
			}

			return group;
		} catch (err) {
			console.log(err);
		}
	};

	const getGroupUsers = async (groupId: string) => {
		try {
			const userGroup = serializeNonPOJOs(
				await locals.pb.collection('userGroup').getList(1, 50, { filter: `groupIDFS="${groupId}"` })
			);

			for (let i = 0; i < userGroup.items.length; i++) {
				users.push(userGroup.items[i]);
			}
			return users;
		} catch (err) {
			console.log(err);
		}
	};

	return {
		group: getGroup(params.groupId),
		users: getGroupUsers(params.groupId)
	};
};
