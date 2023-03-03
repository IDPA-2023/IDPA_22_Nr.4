import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb
				.collection('users')
				.authWithPassword(body.email as string, body.password as string);
		} catch (err) {
			console.error(err);
			throw error(500, 'something went wrong logging in');
		}
		throw redirect(303, '/');
	}
};
