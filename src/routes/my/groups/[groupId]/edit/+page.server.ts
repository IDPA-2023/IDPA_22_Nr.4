import { serializeNonPOJOs } from "$lib/utils";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { User, UserGroup } from "$lib/types";

let users : User[] = []
let userGroups : UserGroup[] = []

export const load : PageServerLoad = async ({ params, locals }) => {
    if(!locals.pb.authStore.isValid){
        throw redirect(303, '/login');
    }

    const getGroup = async (groupId: string) => {
        try {
            const group = serializeNonPOJOs(await locals.pb.collection('group').getOne(groupId))

            if(locals.user){
                if(!(group.hostIDFS === locals.user.id)){
                    throw error(400, "Access Denied!!!")
                }
            }
    
            return group 
        } catch (err) {
            console.log(err)
        }
    }

    const getGroupUsers = async (groupId: string) => {
        users = []
        userGroups = []
        try {
            const userGroup = serializeNonPOJOs(await locals.pb.collection('userGroup').getList(1, 50, {filter: `groupIDFS="${groupId}"`}))

            for(let i=0; i<userGroup.items.length; i++){
                userGroups.push(userGroup.items[i])
                const user = serializeNonPOJOs<User>(await locals.pb.collection('users').getOne(userGroup.items[i].userIDFS))
                users.push(user)
            }
            return{
                users,
                userGroups
            }
        } catch (err) {
            console.log(err)
        }
    }

    return{
        group: getGroup(params.groupId),
        userData: getGroupUsers(params.groupId)
    }
}

export const actions : Actions = {
    deleteUser: async ({ request, locals, params }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            const record = await locals.pb.collection('userGroup').getFirstListItem(`userIDFS="${data.userId}" && groupIDFS="${params.groupId}"`);

            await locals.pb.collection('userGroup').delete(record.id as string)
        } catch (err) {
            console.log(err)
        }
    },
    getUserByUsername:async ({ request, locals, params }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            const user = await locals.pb.collection('users').getFirstListItem(`username="${data.username}"`)

            const newRecordData = {
                "userIDFS": user.id,
                "groupIDFS": params.groupId,
                "weight": 1
            }
            const record = await locals.pb.collection('userGroup').create(newRecordData)
        } catch (err) {
            console.log(err)
        }
    },
    editGroup:async ({ request, locals, params }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            if(locals.user){
                const groupData = {
                    "hostIDFS": locals.user.id,
                    "name": data.groupName
                }
    
                const record = await locals.pb.collection('group').update(params.groupId as string, groupData)

                for(let i=0; i<users.length; i++){
                    const userGroupData = {
                        "userIDFS": users[i].id as string,
                        "groupIDFS": params.groupId as string,
                        "weight": data["weight"+i]
                    }

                    const record = await locals.pb.collection('userGroup').update(userGroups[i].id as string, userGroupData)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}
