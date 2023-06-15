<script setup>
    

    
    import axios from '../axios'
    import {ref} from 'vue';
    import { useUserStore } from '../store/userStore';
    import router from '../router'

    const userStore = useUserStore()

    const form = ref({
        email: '',
        password: ''
    })

    const erros = ref('')


    const handleLogin = async() => {

        
        try {
            
            let resposta = await axios.post('/login', { email: form.value.email, password: form.value.password})
            

            //console.log(resposta);

            userStore.setUserDetails(resposta)
            router.push('/dashboard')
           
            

        } catch (error) {
            console.log(error.response.data.errors)
            erros.value = error.response.data.errors


            
        }
    }
</script>


<template>
    <div>
        <div class="mx-auto  p-6 md:w-2/6 md:mt-16">
            <div className="bg-black w-full p-2 text-center"> Login-Form</div>
            <form @submit.prevent="handleLogin" class="">
                <span v-if="erros.token" class="text-red-700">{{ erros.token[0] }}</span>
                <div class=" flex-col bg-neutral-900 p-6">
                <input type="text" name="email" v-model="form.email" placeholder="Digite o Email" className="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.email" class="text-red-700">{{ erros.email[0] }}</span>
                <input type="password" name="password" v-model="form.password" placeholder="Senha" className="w-full mt-6 bg-transparent border-b-2 focus-within:outline-none">
                <span v-if="erros.password" class="text-red-700">{{ erros.password[0] }}</span>
                <div>
                    <button type="submit" class=" bg-gradient-to-tr from-green-600 to-teal-500 px-2 mt-6 hover:px-4 hover:bg-green-500 duration-150">Login</button>
                </div>
                </div>
            </form>

        </div>
    </div>
</template>

<style scoped>

</style>