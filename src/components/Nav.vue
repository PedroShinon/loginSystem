<template>
    <nav class="bg-black flex w-100 p-4 justify-between ">
      <div>
          <router-link to="/" class=" font-bold text-teal-500">Logo</router-link>
      </div>

      <ul className=" gap-4 flex">
        <li v-if="!chooser">
            <router-link to="/login">Login</router-link>  
        </li>
        <li v-if="chooser">
            <router-link to="/dashboard">Dashboard</router-link>  
        </li>

        <li className=" bg-gradient-to-tr from-green-600 to-teal-500 px-2 hover:px-4 hover:bg-green-500 duration-150 ">
            <router-link to="/register">Register</router-link> 
        </li> 
      </ul>
    </nav>
</template>

<script setup>

import { ref } from 'vue';
import {useUserStore} from '../store/userStore.js'
const userStore = useUserStore()

const chooser = ref(false)

if(userStore.$state.token){
  chooser.value = true
} 

</script>

<style scoped>

</style>