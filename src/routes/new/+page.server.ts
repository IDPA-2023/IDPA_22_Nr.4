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
	addPoll: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		let pollId = '';

		try {
			let publicBool: boolean = false;
			let login: boolean = false;

			if (data.pollVisibility === 'public') {
				publicBool = true;
			} else {
				publicBool = false;
			}

			if (data.pollVisibility === 'privateUsers') {
				login = true;
			} else {
				login = false;
			}

			if (locals.user) {
				try {
					const sendData = {
						"hostIDFS": locals.user.id as string,
						"name": data.title as string,
						"public": publicBool as boolean,
						"require_login": login as boolean,
						"description": data.description as string
					};
	
					console.log(sendData);
					const record = await locals.pb.collection('poll').create(sendData);
					pollId = record.id;
				} catch (err) {
					console.log(err)
					throw error((err as ClientResponseError).status, (err as ClientResponseError).message);
				}

				try {
					const variableData = {
						"pollIDFS": pollId,
						"type": data.radioMehr
					};

					const variable1 = await locals.pb.collection('variable').create(variableData);

					console.log(variableData)

					const variableData2 = {
						"pollIDFS": pollId,
						"type": 'date',
						"startDate": data.startdate as string,
						"endDate": data.enddate as string
					};

					console.log(data.startdate)

					const variable2 = await locals.pb.collection('variable').create(variableData2);
				} catch (err) {
					console.log(err)
					throw error((err as ClientResponseError).status, (err as ClientResponseError).message);
				}
			} else {
				throw error(400, 'Something went wrong!!!');
			}
		} catch (err) {
			throw error((err as ClientResponseError).status, (err as ClientResponseError).message);
		}
		throw redirect(303, `/polls/${pollId}/questions`);
	}
};
