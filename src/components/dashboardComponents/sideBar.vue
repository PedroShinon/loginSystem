<template>
    <nav  class=" h-full bg-green-500 fixed left-0 w-3/6 z-30 lg:w-1/6 delay-150 duration-200 "
            :class="[essentialsStore.$state.navState ? 'left-0' : '-translate-x-full']">
            <ul>
                <li  class="bg-green-700 px-2 py-4 hover:bg-green-800 hover:px-10 duration-200 flex">
                    <ViewDash/>
                    <router-link to="/dashboard">Dashboard</router-link>    
                </li>
                <li class="bg-green-600 px-2 py-4 hover:bg-green-800 hover:px-10 duration-200 flex">
                    <ServerIcon/>
                    Servers
                </li>
                <li class="bg-green-600 px-2 py-4 hover:bg-green-800 hover:px-10 duration-200 flex">
                    <List/>
                    List
                </li>
                <li class="bg-green-600 px-2 py-4 hover:bg-green-800 hover:px-10 duration-200 flex">
                    <WalletIcon/>
                    Compras
                </li>
            </ul>
        </nav>
</template>

<script setup>

import  ViewDash from 'vue-material-design-icons/ViewDashboard.vue';
import  List from 'vue-material-design-icons/ListBox.vue';
import ServerIcon from 'vue-material-design-icons/ServerNetwork.vue';
import WalletIcon from 'vue-material-design-icons/Wallet.vue'
import { useEssentialsStore } from '../../store/essentialsStore'
import { ref } from 'vue';



const essentialsStore = useEssentialsStore();

let Open = ref(essentialsStore.$state.navState)
let open = ref(false)





</script>

<style lang="scss" scoped>

</style>