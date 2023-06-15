<template>
    <div class=" m-2 mt-8 mx-auto bg-neutral-900 md:w-3/6">
            <div class=" text-center bg-black">
                <h1>Profile</h1>
                
            </div>
            <div class="p-4 ">
                <h2> <span class="text-green-500">Nome:</span>   {{ userData.first_name }} </h2>
                <h2> <span class="text-green-500">SobreNome:</span>  {{ userData.last_name }}</h2>
                <h2> <span class="text-green-500">Email:</span>  {{ userData.email }}</h2>
            </div>
            <div class="w-100 flex justify-end p-4">
                <router-link to="/dashboard/editProfile" class="flex">Editar <Pencil/></router-link>
            </div>
                
    </div>
</template>

<script setup>

import axios from '../../axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../store/userStore';
import  Pencil from 'vue-material-design-icons/FileEdit.vue';
import { RouterLink } from 'vue-router';

const userData = ref({})
const userStore = useUserStore()

const getProfileData = async () => {
    try {
          await axios.get('/user',
          { headers: {'Content-type': 'application/json', 'Authorization': 'Bearer ' + userStore.token}})
        .then((response) => userData.value = response.data.user);

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getProfileData();
    
})

</script>

<style scoped>

</style>