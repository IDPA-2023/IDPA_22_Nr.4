import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import type { Question } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals, params }) => {
	const poll = async () => {
		return await locals.pb.collection('poll').getFirstListItem(`id="${params.pollId}"`);
	};
	if (!locals.pb.authStore.isValid) {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	}
	/*if(locals.user){
        if(poll.hostIDFS !== locals.user.id){
            console.log('redirect')
            locals.pb.authStore.clear()
            throw redirect(303, '/login')
        }
    }*/

	const getQuestions = async (pollId: string) => {
		try {
			const poll = await locals.pb.collection('poll').getFirstListItem(`id="${pollId}"`);

			const questions = serializeNonPOJOs<Question[]>(
				await locals.pb.collection('question').getFullList({ filter: `pollIDFS="${pollId}"` })
			);
			console.log(questions);

			return {
				questions: questions
			};
		} catch (err) {
			console.log(err);
		}
	};

	return {
		questions: getQuestions(params.pollId),
		pollId: params.pollId
	};
};

export const actions: Actions = {
	deleteQuestion: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const record = await locals.pb.collection('question').delete(data.id);
		} catch (err) {
			console.log(err);
		}
	}
};
