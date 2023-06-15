

<script setup>

import dashNav from '../../components/dashboardComponents/dashNav.vue';
import sideBar from '../../components/dashboardComponents/sideBar.vue'


</script>

<template>
    <main>
        <dashNav></dashNav>
        <sideBar/>
        <div class="flex mt-14">
            
            <router-view/>
            
        </div>
        

    </main>
</template>

<style  scoped>

</style>