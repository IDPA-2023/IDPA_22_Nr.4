import { editPollSchema } from "$lib/schemas";
import type { Poll } from "$lib/types";
import { serializeNonPOJOs, validateData } from "$lib/utils";
import { error, fail, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    
    if (!locals.pb.authStore.isValid) throw redirect(303,'/');

    const getPoll = async (pollId: string) => { 
        try {
            const poll = serializeNonPOJOs<Poll>(await locals.pb.collection('poll').getOne(pollId));
            if (poll.hostIDFS !== locals.user?.id) {
                throw redirect(303, '/');
            }
            return poll;
        } catch (err) {
            const e = err as ClientResponseError;
            if(e.status === 303) throw redirect(e.status, '/');
            throw error(e.status, e.message);
        }
    }

    return {
        poll: getPoll(params.pollId),
    }
};


export const actions: Actions = {
    editPoll: async ({ locals, request, params }) => {
        const { formData, errors } = await validateData(await request.formData(), editPollSchema);

        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            });
        }

        try {
            await locals.pb.collection('poll').update(params.pollId as string, {
                name: formData.title as string,
                description: formData.description as string,
            });
        }
        catch (err) {
            const e = err as ClientResponseError;
            throw error(e.status, e.message);
        }
        throw redirect(303, `/polls/${params.pollId}`);
    }
};