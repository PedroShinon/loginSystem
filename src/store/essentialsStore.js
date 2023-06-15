import {defineStore} from 'pinia'


export const useEssentialsStore = defineStore('essentials', {

    state: () => ({
        navState: false
    }),

    actions: {
        async setNavState() {
            this.$state.navState = !this.$state.navState
        }
    },

    persist: true

})