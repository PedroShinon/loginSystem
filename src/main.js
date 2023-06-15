import { createApp } from 'vue'
import router from './router'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import './axios'
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');