import { error, type Actions } from "@sveltejs/kit"
import type { ClientResponseError } from "pocketbase"

export const actions: Actions = {
    updateProfile: async ({ request, locals }) => {
        let data = await request.formData()

        const userAvatar = data.get('avatar') as File

        if(userAvatar.size === 0){
            data.delete('avatar')
        }

        try{
            const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id as string, data)
            if (locals.user?.id){
                locals.user.name = name
                locals.user.avatar = avatar
            }
        }catch(err){
            console.log('Error: ', err)
            throw error((err as ClientResponseError).status, (err as ClientResponseError).message)
        }

        return{
            success: true
        }
    }
}
