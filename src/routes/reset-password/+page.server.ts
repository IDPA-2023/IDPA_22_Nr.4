import { error, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			if (body.email) {
				await locals.pb.collection('users').requestPasswordReset(body.email);
			}
			return {
				success: true
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}
	}
};
