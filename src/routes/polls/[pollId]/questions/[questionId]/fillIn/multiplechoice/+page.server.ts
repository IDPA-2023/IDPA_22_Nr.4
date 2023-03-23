import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = ({ locals, params }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login');
    }

    const getValues = async () => {
        const questionId = params.questionId
        // fetch a paginated records list
        const resultList = await pb.collection('option').getList(1, 50, {
            filter: `questionId = ${questionId}`
        });

        // or fetch only the first record that matches the specified filter
        const record = await pb.collection('question').getFirstListItem(`questionId = ${questionId}`);

        return {
            question: record, optionList: resultList
        }

    }
 return {values: getValues()}
}

