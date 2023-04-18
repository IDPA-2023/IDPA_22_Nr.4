import type { Group } from "$lib/types";
import { serializeNonPOJOs } from "$lib/utils";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load : PageServerLoad = ({ locals }) => {
    if(!locals.pb.authStore.isValid){
        throw redirect(303, '/login');
    }

    const getGroups = async () => {
        try {
            if(locals.user){
                const groupList = serializeNonPOJOs(await locals.pb.collection('group').getList(1, 50, {
                    filter: `hostIDFS="${locals.user.id}"`,
                }));
                return groupList;
            }
        } catch (err) {
            console.log(err)
        }   
    }
    return{
        groups: getGroups()
    }
}

export const actions : Actions = {
    deleteGroup: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('group').delete(data.groupId as string);
        } catch (err) {
            console.log(err)
        }
    }
}
