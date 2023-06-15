<script setup>
    

    
    import axios from '../axios';
    import {ref} from 'vue';
    import { useUserStore } from '../store/userStore';
    import router from '../router'

    const userStore = useUserStore()

    const form = ref({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const erros = ref('')

    

    const handleRegister = async() => {

       

        try {
            let resposta = await axios.post('/register', { first_name: form.value.first_name, last_name: form.value.last_name, email: form.value.email, password: form.value.password, password_confirmation: form.value.password_confirmation})

            userStore.setUserDetails(resposta)
            router.push('/dashboard')

        } catch (error) {
            //console.log(error.response.data.errors)
            erros.value = error.response.data.errors
           
            
        }
        
    }
    
</script>

<template>
    <div>
        <div class="mx-auto p-6 md:w-2/6 md:mt-16">
            <div class="bg-black w-full p-2 text-center"> Register-Form</div>
            <form @submit.prevent="handleRegister" >
                <div class=" flex-col bg-neutral-900 p-6">
                
                <input type="text" name="first_name" v-model="form.first_name" placeholder="Digite seu Nome" class="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.first_name" class="text-red-700">{{ erros.first_name[0] }}</span>
                <input type="text" name="last_name" v-model="form.last_name" placeholder="Digite seu sobrenome" class="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.last_name" class="text-red-700">{{ erros.last_name[0] }}</span>
                <input type="text" name="email" v-model="form.email" placeholder="Digite o Email" class="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.email" class="text-red-700">{{ erros.email[0] }}</span>
                <input type="password" name="password" v-model="form.password" placeholder="Senha" class="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.password" class="text-red-700">{{ erros.password[0] }}</span>
                <input type="password" name="password_confirmation" v-model="form.password_confirmation" placeholder="Confirmar senha" class="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.password_confirmation" class="text-red-700">{{ erros.password_confirmation[0] }}</span>
                <div>
                    <button type="submit" class=" mt-6 bg-gradient-to-tr from-green-600 to-teal-500 px-2 hover:px-4 hover:bg-green-500 duration-150">Sign-in</button>
                </div>
                </div>
            </form>

        </div>
    </div>
</template>



<style scoped>

</style>