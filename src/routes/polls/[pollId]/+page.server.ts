import type { Poll, Question, Variable, Vote, userGroup } from '$lib/types';
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

	const getGroupCount = async (pollId: string) => {
		try {
			const poll = serializeNonPOJOs<Poll>(
				await locals.pb.collection('poll').getOne(pollId, { $autoCancel: false })
			);
			const group = serializeNonPOJOs<userGroup[]>(
				await locals.pb.collection('userGroup').getFullList({
					expand: 'groupIDFS',
					filter: `groupIDFS.id = '${poll.groupIDFS}'`
				})
			);
			let count = 0;
			group.forEach((user) => {
				count += user.weight;
			});
			return count;
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	const getVariables = async (pollId: string) => {
		try {
			const variable = serializeNonPOJOs<Variable[]>(
				await locals.pb.collection('variable').getFullList({ filter: `pollIDFS = '${pollId}'` })
			);
			return variable;
		} catch (err) {
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}
	};

	return {
		poll: getPoll(params.pollId),
		questions: getQuestion(params.pollId),
		votes: getVotes(params.pollId),
		groupCount: getGroupCount(params.pollId),
		variables: getVariables(params.pollId)
	};
};
