import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

let userIds = []

export const load : PageServerLoad = ({ locals }) => {
    if(!locals.pb.authStore.isValid){
        throw redirect(303, '/login');
    }
}

export const actions : Actions = {
    getUserByUsername: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            
        } catch (err) {
            
        }
    }
}
