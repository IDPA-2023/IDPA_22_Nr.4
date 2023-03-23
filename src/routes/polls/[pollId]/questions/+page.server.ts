import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import type { Question } from '$lib/types';

export const load: PageServerLoad = ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getQuestions = async (pollId: string) => {
		try {
			/*const poll = await locals.pb.collection('poll').getFirstListItem(`id="${pollId}"`)

            if(locals.user){
                if(poll.hostIDFS !== locals.user.id){
                    throw redirect(303, '/')
                }
            }*/

			const questions = serializeNonPOJOs<Question[]>(
				await locals.pb.collection('question').getFullList({ filter: `pollIDFS="${pollId}"` })
			);

			return {
				questions: questions
			};
		} catch (error) {}
	};

	return {
		questions: getQuestions(params.pollId),
		pollId: params.pollId
	};
};
