import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;

	throw redirect(303, '/login');
};
