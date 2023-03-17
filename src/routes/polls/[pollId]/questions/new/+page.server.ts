import { error, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
    
}
