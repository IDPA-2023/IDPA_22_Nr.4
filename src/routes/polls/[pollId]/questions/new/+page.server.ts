import { error, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	addQuestion: async ({ request, locals, params }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const similarQuestions = await locals.pb
				.collection('question')
				.getList(1, 50, { filter: `pollIDFS="${params.pollId}"` });
			let foundSimilar = false;

			similarQuestions.items.forEach((item) => {
				if (item.question === data.question) {
					foundSimilar = true;
				}
			});

			if (!foundSimilar) {
				let type = '';
				let options = [];
				if (data.pollType === 'multiple') {
					type = 'multiple';
					let indexOptions = 0;
					let isOption = true;

					while (isOption) {
						if ('option' + indexOptions in data) {
							let keyOption = 'option' + indexOptions;
							options[indexOptions] = data[keyOption];
							indexOptions = indexOptions + 1;
						} else {
							isOption = false;
						}
					}
				} else if (data.pollType === 'random') {
					type = 'free';
				} else if (data.pollType === 'yesNo') {
					type = 'yesNo';
				}

				const sendData = {
					pollIDFS: params.pollId,
					question: data.question,
					type: type
				};

				const question = await locals.pb.collection('question').create(sendData);

				if (data.pollType === 'multiple') {
					try {
						for (let i = 0; i < options.length; i++) {
							const optionData = {
								questionIDFS: question.id,
								option: options[i]
							};

							const record = await locals.pb.collection('option').create(optionData);
						}
					} catch (err) {
						console.log((err as ClientResponseError).data);
					}
				}
			} else {
				throw error(404, 'Similar question already exists');
			}
		} catch (err) {
			console.log(err)
			throw error((err as ClientResponseError).status, (err as ClientResponseError).message);
		}
		throw redirect(303, `/polls/${params.pollId}/questions`);
	}
};
