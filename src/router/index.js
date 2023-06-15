import {createRouter, createWebHistory} from "vue-router"
import '../axios'
import axios from 'axios'
import { useUserStore } from "../store/userStore"

//pages
import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'
import Register from '../pages/Register/Register.vue'
import Dashboard from '../pages/Dashboard/Dashboard.vue'

//children
import profile from '../components/dashboardComponents/userProfile.vue'
import editProfile from '../components/dashboardComponents/editProfile.vue'



const routes = [
    {   
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next)=>{
            useUserStore().token ? next({name: 'Dashboard'}) : next()
        }
        
    },

    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next)=>{
            useUserStore().token ? next({name: 'Dashboard'}) : next()
        }
        
    },

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard, 
        meta: {
            auth: true
        },
        children: [
            {path: 'profile', name: 'DashProfile', component: profile },
            {path: 'editProfile', component: editProfile }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    

    if(to.meta?.auth) {
        const userStore = useUserStore()
        if(userStore.$state.token && userStore.$state.email) {

            try {

                const res = axios.post('/verifyAuth', {id: userStore.$state.id},
                 { headers: {'Content-type': 'application/json', 'Authorization': 'Bearer ' + userStore.token}})
                .then((res) => {
                    //console.log(res.data.valor)
                     if(res.data.valor){
                        //console.log('foi certo')
                        next();
                        return
                     } else {
                        //console.log('foi não')
                        next({name: 'Login'})
                     }
                })
                 
                
                
            } catch (error) {
                
                console.log(error)
                
                
            }
            
        } else {
            next({name: 'Login'})
        }
        
    } else {
        next();
    }
});

export default router;