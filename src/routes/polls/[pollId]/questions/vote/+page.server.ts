import type { Option, Question } from "$lib/types";
import { serializeNonPOJOs } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals, params}) => {
    const getQuestions = async (pollId: string) => {
        try {
            const questions = serializeNonPOJOs<Question[]>(await locals.pb.collection('question').getFullList({
                filter: `pollIDFS = "${pollId}"`
            }))
            return questions;
        } catch (err) {
            const e = err as ClientResponseError;
            throw error(e.status, e.message);
        }
    }

    const getOptions = async (pollId: string) => { 
        try {
            const options = serializeNonPOJOs<Option[]>(await locals.pb.collection('option').getFullList({
                expand: 'questionIDFS',
                filter: `questionIDFS.pollIDFS = "${pollId}"`
            }))
            return options;
        } catch (err) {
            const e = err as ClientResponseError;
            throw error(e.status, e.message);
        }
    }

    return {
        questions: getQuestions(params.pollId),
        options: getOptions(params.pollId)
    }
};

export const actions: Actions = {
    submitVote: async ({ locals, request }) => { 

        let body = await request.formData();

        let questionIDFS = body.getAll("questionIDFS");
        let votes = body.getAll("vote");

        votes.forEach((vote, index) => {
            if (vote === "") {
                votes.splice(index, 1);
                questionIDFS.splice(index, 1);
            }
        });

        votes.forEach(async (vote, index) => {
            try {
                await locals.pb.collection('vote').create({
                    "questionIDFS": questionIDFS[index] as string,
                    "vote": vote as string,
                    "userIDFS": locals.user?.id
                }, { '$autoCancel': false });
            } catch (err) {
                console.log(err);
                const e = err as ClientResponseError;
                throw error(e.status, e.message);
            }
        });
    }
};