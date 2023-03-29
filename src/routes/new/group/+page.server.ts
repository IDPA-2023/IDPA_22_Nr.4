import type { User } from "$lib/types";
import { serializeNonPOJOs } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

let users = []

export const load : PageServerLoad = ({ locals }) => {
    if(!locals.pb.authStore.isValid){
        throw redirect(303, '/login');
    }
}

export const actions : Actions = {
    getUserByUsername: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())
        console.log(data)
        try {
            const record = serializeNonPOJOs<User>(await locals.pb.collection('users').getFirstListItem(`username="${data.username}"`))
            users.push(record)
        } catch (err) {
            console.log('ERROR: '+err)
        }
    }
}
