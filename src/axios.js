import axios from "axios";


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
//axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    return config;
})



export default axios;