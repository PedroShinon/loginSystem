<template>
    <div class=" m-2 mt-8 mx-auto bg-neutral-900 md:w-3/6">
            <div class=" text-center bg-black">
                <h1>Editar Perfil</h1>
                
            </div>
            <form @submit.prevent="handleUpdate">
                <div class="p-4 ">
                    <div class="flex mb-4">
                        <span class="text-green-500 mr-2">Nome:</span><input type="text" name="first_name" 
                            v-model="userData.first_name"
                            placeholder="Digite seu Nome" 
                            class="w-full bg-transparent border-b-2 focus-within:outline-none">
                    </div> 
                    <div class="flex mb-4">
                        <span class="text-green-500 mr-2">SobreNome:</span><input type="text" name="last_name" 
                            v-model="userData.last_name"
                            placeholder="Digite seu Sobrenome" 
                            class="w-full bg-transparent border-b-2 focus-within:outline-none">
                    </div>
                    <div class="flex mb-4">
                        <span class="text-green-500 mr-2">Nova Senha:</span><input type="text" name="password" 
                            v-model="form.password"
                            placeholder="Digite seu senha" 
                            class="w-full bg-transparent border-b-2 focus-within:outline-none">
                    </div>
                    <div class="flex mb-4">
                        <span class="text-green-500 mr-2">Confirmar Senha:</span><input type="text" name="password_confirmation" 
                            v-model="form.password_confirmation"
                            placeholder="Digite sua confirmação" 
                            class="w-full bg-transparent border-b-2 focus-within:outline-none">
                    </div>
                    <div>
                        <h3 v-if="resp" class="text-green-500">{{ resp }}<br></h3>
                        <h3 v-if="erros.password" class="text-red-500">{{ erros.password[0] }} <br></h3>
                        <h3 v-if="erros.first_name" class="text-red-500">{{ erros.first_name[0] }} <br></h3>
                        <h3 v-if="erros.last_name" class="text-red-500">{{ erros.last_name[0] }} <br></h3>
                    </div>
                    
                    
                </div>
                <div class="w-100 flex justify-between p-4">
                    <button @click.prevent="handleDeleteAviso" class="flex border-b-2 border-red-500 p-2">Deletar conta <Pencil/></button>
                    <button class="flex border-b-2 border-teal-500 p-2">Salvar <Trash/></button>
                </div>

                
            </form>   

            <div :class="[modal ? '' : 'hidden']" class="p-4 mt-4 h-100 z-10 bg-black top-12 mb-20">
                <p class="mb-2">Você tem certeza que deseja deletar sua conta? junto a escolha voluntária de deletar você concorda automaticamente
                    com o apagar de todos os dados ligados a sua conta de quaisquer natureza.
                </p>
                <div class="flex mb-4">
                        <span class="text-green-500 mr-2">Confirmar Email:</span><input type="email" name="email"
                            v-model="valor.email" 
                            placeholder="Digite seu email" 
                            class="w-full bg-transparent border-b-2 focus-within:outline-none">
                            
                </div>
                <div v-if="respconf"><h3 class="text-yellow-500">{{ respconf }}<br></h3></div>
                <div class="justify-between flex">
                    <button @click.prevent="handleDeleteAccount" class="flex border-b-2 border-red-500 p-2">Sim, Deletar <Trash/></button>
                    <button @click.prevent="handleDeleteAviso" class="flex border-b-2 border-teal-500 p-2">Não <Pencil/></button>
                </div>
                    
            </div>
    </div>
</template>

<script setup>

import axios from '../../axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../store/userStore';
import  Pencil from 'vue-material-design-icons/FileEdit.vue';
import  Trash from 'vue-material-design-icons/TrashCan.vue';

import router from '../../router';


const userData = ref({})
const resp = ref('')
const respconf = ref('')
const erros = ref('')
const modal = ref(false)
const valor = ref({
    email: ''
})
const form = ref({
        password: '',
        password_confirmation: ''
    })
const userStore = useUserStore()

const getProfileData = async () => {
    try {
          await axios.get('/user')
        .then((response) => userData.value = response.data.user);
        

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getProfileData();
    
})

const handleUpdate = async () => {
    try {
        await axios.post('/user/update', 
        {first_name: userData.value.first_name, last_name: userData.value.last_name,
        password: form.value.password, password_confirmation: form.value.password_confirmation})
        .then((response) => {
            resp.value = response.data.message
            router.push({name: 'DashProfile'})
        })
    } catch (error) {
        //console.log(error.response.data.errors)
        erros.value = error.response.data.errors
    }
}

const handleDeleteAviso = () => {
    modal.value = !modal.value
    
}

const handleDeleteAccount = async () => {
    try {
        await axios.post('/user/delete', {email: valor.value.email})
        .then((response) => {
            console.log(response)
            respconf.value = response.data
            if (response.status == 200) {
                localStorage.removeItem('user');
                localStorage.removeItem('essentials');
                router.push({name: 'Home'})
            }
            
        })
    } catch (error) {
        //console.log(error.response.data.errors)
        erros.value = error.response.data.errors
    }
}

</script>

<style scoped>

</style>