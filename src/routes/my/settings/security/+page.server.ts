import { error, redirect, type Actions } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export const actions: Actions = {
    updatePassword: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())
        console.log(data)

        try {
            if(locals.user?.id){
                await locals.pb.collection('users').update(locals.user.id, data)
                locals.pb.authStore.clear()
            }
        } catch (err) {
            throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
        }
        throw redirect(303, '/login')
    }
}
