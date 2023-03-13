<script lang="ts">
    import { page } from '$app/stores'

    export let data

    const navigation = [
        {
            title: 'Profil',
            href: 'my/settings/profile'
        },{
            title: 'Konto',
            href: 'my/settings/account'
        },{
            title: 'Sicherheit',
            href: 'my/settings/security'
        }
    ]
</script>

<div class="w-full h-full px-2">
    <h3 class="text-2xl font-medium"></h3>
</div>

