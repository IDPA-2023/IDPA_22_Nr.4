import { error } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.pb.authStore.isValid){
        throw redirect(303, '/login')
    }
}

export const actions: Actions = {
    updateEmail: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            console.log(data.newEmail)
            await locals.pb.collection('users').requestEmailChange('new@example.com');
        } catch(err) {
            console.log(err)
            throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
        }

        return {
            success: true
        }
    },

    updateUsername: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`)
        } catch (err) {
            if ((err as ClientResponseError).status === 404){
                try {
                    if(locals.user?.id){
                        const { username } = await locals.pb.collection('users').update(locals.user.id, {username: data.username})
                        locals.user.username = username
                        return {
                            success: true
                        }
                    }
                } catch (err) {
                    throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
                }
            }
            throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
        }
    }
}
