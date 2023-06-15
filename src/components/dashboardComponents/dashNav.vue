
<script setup>

    import axios from '../../axios'
    import { useUserStore } from '../../store/userStore'
    import  MenuIcon from 'vue-material-design-icons/Menu.vue'
    import  logout from 'vue-material-design-icons/Logout.vue'
    import { useEssentialsStore } from '../../store/essentialsStore'
    import router from '../../router'

    const userStore = useUserStore()
    const essentialsStore = useEssentialsStore();


    const handleLogout = async() => {

        //console.log('usando logout')
        try {
            
            let resposta = await axios.post('/logout', 
             {user_id: userStore.$state.id},
             { headers: {'Content-type': 'application/json', 'Authorization': 'Bearer ' + userStore.token}})
            //console.log(resposta)
            await userStore.clearUser()
            localStorage.removeItem('user');
            localStorage.removeItem('essentials');
            router.push('/login')

        } catch (error) {
            console.log('um erro ocorreu no logout')

        }
    }

</script>


<template>
    <div class=" fixed top-0 w-full">
        <nav class="bg-black flex w-100 p-4 justify-between ">
        <div>
            <a @click="essentialsStore.setNavState()" class="cursor-pointer"><MenuIcon/></a>
        </div>

            <ul class=" gap-4 flex">
                <li>
                    <router-link to="/dashboard/profile">Profile</router-link>  
                </li>

                <li class="cursor-pointer bg-green-500 px-1  hover:px-2 hover:bg-green-500 duration-150 ">
                    <form @click.prevent="handleLogout"><logout/></form> 
                </li> 
            </ul>
        </nav>
    </div>
</template>



<style scoped>

</style>