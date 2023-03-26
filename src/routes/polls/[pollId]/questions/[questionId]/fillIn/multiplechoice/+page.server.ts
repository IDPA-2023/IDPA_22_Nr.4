import type { PageServerLoad } from "./$types";
import { redirect, error } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils"
import type { Option, Question } from "$lib/types"
import type { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = ({ locals, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login');
    }

    const getOptions = async (questionId: string) => {
        try {
            const options = serializeNonPOJOs<Option[]>(await locals.pb.collection('option').getFullList({
                filter: `questionIDFS = "${questionId}"`
            }));
            return options;
        } catch (err) {
            const e = err as ClientResponseError;
            throw error(e.status, e.message);
        }

        
    }
    
    const getQuestion = async (questionId: string) => {
        try {
            const question = serializeNonPOJOs<Question>(await locals.pb.collection('question').getFirstListItem(`id="${questionId}"`));
            return question;
        } catch (err) {
            const e = err as ClientResponseError
            throw error(e.status, e.message)
        }
    }

    return {
        options: getOptions(params.questionId),
        question: getQuestion(params.questionId)
    }
}

export const actions: Actions = {
    createVote: async ({locals, request}) => {
        console.log(Object.fromEntries(await request.formData()))
    }
}

