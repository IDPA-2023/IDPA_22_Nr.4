import type { Handle } from "@sveltejs/kit";
import PocketBase from 'pocketbase';
import { DB_URL } from "$env/static/private"
import { serializeNonPOJOs } from "$lib/utils";
import type { User } from "$lib/types";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(DB_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

    try {
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection("users").authRefresh();
            event.locals.user = serializeNonPOJOs<User>(event.locals.pb.authStore.model as User);
        }
    } catch (_) {
        event.locals.pb.authStore.clear();
        event.locals.user = undefined;
    }

    const response = await resolve(event);

    response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie());

    return response;
}