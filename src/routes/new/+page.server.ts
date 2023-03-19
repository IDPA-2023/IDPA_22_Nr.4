import { error, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
export const load : PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions : Actions = {
    addPoll: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())
        let pollId = ''

        try {
            let publicBool : boolean = false
            let login : boolean = false

            if(data.pollVisibility === 'public'){
                publicBool = true;
            }else{
                publicBool = false
            }

            if(data.pollVisibility === 'privateUsers'){
                login = true
            }else{
                login = false
            }

            if(locals.user){
                const sendData = {
                    "hostIDFS": locals.user.id,
                    "name": data.title as string,
                    "public": publicBool as boolean,
                    "require_login": login as boolean,
                    "description": data.description as string
                };

                console.log(sendData)

                try {
                    const record = await locals.pb.collection('poll').create(sendData);
                    pollId = record.id
                } catch (err) {
                    throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
                }

                try {
                    const variableData = {
                        "surveyIDFS": pollId,
                        "type": data.radioMehr
                    }

                    const variable1 = await locals.pb.collection('variable').create(variableData)

                    const variableData2 = {
                        "surveyIDFS": pollId,
                        "type": 'date',
                        "startDate": data.startdate as string,
                        "endDate": data.enddate as string
                    }
                    
                    const variable2 = await locals.pb.collection('variable').create(variableData2)

                } catch (err) {
                    throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
                }
            }else{
                throw error(400, "Something went wrong!!!")
            }
        } catch (err) {
            console.log(err)
            throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
        }
        throw redirect(303, `/polls/${pollId}/questions`) 
    }
}
