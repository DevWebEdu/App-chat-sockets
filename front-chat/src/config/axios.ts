import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers : {
    //         'Accept' : 'application/json',
    //         'X-Request-With' : 'XMLHttpRequest'
    // },
    // withCredentials : true
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("TOKEN_AUTH");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default api;