import { error, redirect, type Actions } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import type { Question } from '$lib/types';
import type { PageServerLoad } from '../../$types';
import type { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = ({ locals, params }) => {
	const poll = async () => {
		return await locals.pb.collection('poll').getFirstListItem(`id="${params.pollId}"`);
	};
	if (!locals.pb.authStore.isValid) {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	}

	const getQuestion = async (questionId: string) => {
		try {
			const question = serializeNonPOJOs(
				await locals.pb.collection('question').getOne(questionId as string, { $autoCancel: false })
			);

			return {
				question: question
			};
		} catch (err) {
			console.log(err);
		}
	};

	const getOptions = async (questionId: string) => {
		try {
			const question = serializeNonPOJOs<Question>(
				await locals.pb.collection('question').getOne(questionId as string, { $autoCancel: false })
			);
			console.log(question);
			if (question.type === 'select' || question.type === 'multiple') {
				const resultList = serializeNonPOJOs(
					await locals.pb.collection('option').getList(1, 50, {
						filter: `questionIDFS = "${questionId}"`
					})
				);
				return {
					options: resultList
				};
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		question: getQuestion(params.questionId),
		questionId: params.questionId,
		options: getOptions(params.questionId)
	};
};

export const actions: Actions = {
	editQuestion: async ({ locals, request, params }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const questionData = {
				pollIDFS: params.pollId,
				question: data.question
			};

			const record = await locals.pb
				.collection('question')
				.update(params.questionId as string, questionData);

			if (record.type === 'multiple' || record.type === 'select') {
				if (data.options && data.options.length != 0) {
					let usedIndexes = [];
					const oldOptions = serializeNonPOJOs(
						await locals.pb.collection('option').getList(1, 50, {
							filter: `questionIDFS = "${params.questionId}"`
						})
					);
					for (let i = 0; i < oldOptions.items.length; i++) {
						if (!data[oldOptions.items[i].id]) {
							const record = await locals.pb.collection('option').delete(oldOptions.items[i].id);
						} else {
							if (oldOptions.items[i].option !== data['option' + data[oldOptions.items[i].id]]) {
								const newOptionData = {
									option: data['option' + data[oldOptions.items[i].id]]
								};
								const response = await locals.pb
									.collection('option')
									.update(oldOptions.items[i].id, newOptionData);
							}
							let noEqualFound = true;
							for (let j = 0; j < usedIndexes.length; j++) {
								if (usedIndexes[j] === data[oldOptions.items[i].id]) {
									noEqualFound = false;
								}
							}
							if (noEqualFound) {
								usedIndexes.push(data[oldOptions.items[i].id]);
							}
						}
					}
					for (let i = 0; i < data.options.length; i++) {
						let indexNotFound = true;
						for (let j = 0; j < usedIndexes.length; j++) {
							let iString = '' + i;
							if (iString === usedIndexes[j]) {
								indexNotFound = false;
							}
						}
						if (indexNotFound) {
							const newOptionData = {
								questionIDFS: params.questionId,
								option: data['option' + i]
							};
							const newOption = await locals.pb.collection('option').create(newOptionData);
						}
					}
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};
