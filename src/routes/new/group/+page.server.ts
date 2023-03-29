import type { User } from "$lib/types";
import { serializeNonPOJOs } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

let users = []

export const load : PageServerLoad = ({ locals }) => {
    if(!locals.pb.authStore.isValid){
        throw redirect(303, '/login');
    }
    return{
        users: users
    }
}

export const actions : Actions = {
    getUserByUsername: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())
        console.log(data.username)
        try {
            const record = serializeNonPOJOs<User>(await locals.pb.collection('users').getFirstListItem(`username="${data.username}"`))
            users.push(record)
            console.log(record)
        } catch (err) {
            console.log(err)
        }
    },
    createGroup: async ({ request, locals }) => {
      const data = Object.fromEntries(await request.formData())
      
      try {
        const createGroupData = {
            "hostIDFS": locals.user?.id,
            "name": data.name
          }
    
          const group = await locals.pb.collection('group').create(createGroupData)

          console.log(users)
          for(let i=0; i< users.length; i++){
            const userGroupData = {
                "userIDFS": users[i].id,
                "groupIDFS": group.id,
                "weight": 1
            }
            const usergroup = await locals.pb.collection('userGroup').create(userGroupData) 
          }
      } catch (err) {
        console.log(err)
      }
    }
}
