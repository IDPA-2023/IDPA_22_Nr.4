import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { DB_URL } from '$env/static/private';
import { serializeNonPOJOs } from '$lib/utils';
import type { User } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	event.locals.pb = new PocketBase(DB_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs<User>(event.locals.pb.authStore.model as User);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(/data-theme="([a-zA-Z]*)"/, `data-theme="${theme}"`)
	});

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());
	response.headers.append('set-cookie', `colortheme=${theme}; path=/; max-age=31536000;`);

	return response;
};
