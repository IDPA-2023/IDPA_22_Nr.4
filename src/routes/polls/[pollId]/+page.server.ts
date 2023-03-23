import type { Poll, Question, Vote } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const getPoll = async (pollId: string) => {
		try {
			const poll = serializeNonPOJOs<Poll>(await locals.pb.collection('poll').getOne(pollId));
			return poll;
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	const getQuestion = async (pollId: string) => {
		try {
			const questions = serializeNonPOJOs<Question[]>(
				await locals.pb.collection('question').getFullList({
					filter: `pollIDFS = '${pollId}'`
				})
			);
			return questions;
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	const getVotes = async (pollId: string) => {
		try {
			const votes = serializeNonPOJOs<Vote[]>(
				await locals.pb.collection('vote').getFullList({
					expand: 'questionIDFS,userIDFS',
					filter: `questionIDFS.pollIDFS = '${pollId}'`
				})
			);
			return votes;
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	return {
		poll: getPoll(params.pollId),
		questions: getQuestion(params.pollId),
		votes: getVotes(params.pollId)
	};
};
