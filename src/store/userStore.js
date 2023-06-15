import {defineStore} from 'pinia'
import  axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        token: null,
        first_name: null,
        last_name: null,
        email: null,
        
    }),

    actions: {
        async setUserDetails(res) {
            this.$state.token = res.data.token
            this.$state.id = res.data.user.id
            this.$state.email = res.data.user.email
            this.$state.first_name = res.data.user.first_name
            this.$state.last_name = res.data.user.last_name
        },
        async fetchUser() {
            let res = await axios.get('/users/' + this.$state.id)

            this.$state.id = res.data.user.id
            this.$state.first_name = res.data.user.first_name
            this.$state.last_name = res.data.user.last_name
        },

        clearUser() {
            this.$state.token = null
            this.$state.id = null
            this.$state.email = null
            this.$state.first_name = null
            this.$state.last_name = null
        },

         async checkUser() {
            try {

                const res = await axios.post('/verifyAuth', {id: this.$state.id})
                .then((res) => {
                    console.log(res.data.valor)
                    return res.data.valor
                })
                 
                
                
            } catch (error) {
                
                console.log(error)
                
            }
        }
    },

    persist: true

})