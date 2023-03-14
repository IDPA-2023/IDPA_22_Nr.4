import { changePasswordSchema } from "$lib/schemas";
import { validateData } from "$lib/utils";
import { error, redirect, type Actions, fail } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export const actions: Actions = {
    updatePassword: async ({ request, locals }) => {
        const { formData, errors } = await validateData(await request.formData(), changePasswordSchema)
        console.log(formData)

        if(errors){
            return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
        }

        try {
            if(locals.user?.id){
                await locals.pb.collection('users').update(locals.user.id, formData)
                locals.pb.authStore.clear()
            }
        } catch (err) {
            throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
        }
        throw redirect(303, '/login')
    }
}
