import { loginUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { fail, redirect, error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb
				.collection('users')
				.authWithPassword(formData.email as string, formData.password as string);
		} catch (err) {
			console.error(err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
		throw redirect(303, '/');
	}
};
