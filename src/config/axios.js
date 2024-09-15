import axios from 'axios';
import router from '@/router';
import {useToast} from "vue-toastification";
const toast = useToast();

const token = localStorage.getItem("token");
axios.defaults.withCredentials = true;
const instance = axios.create({
    // baseURL: 'http://localhost:8080/api/',
    baseURL: 'https://mock-api.nals.vn/api/v2/',
    withCredentials: true,
    headers: {
        common: {
            Authorization: token !== null ? "Bearer " + token : "",
        },
    },
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(response => {
    return response;
}, error => {
    let status = error.response.status
    if(status == 401) {
        toast.error("Please retry!");
        localStorage.clear();
        instance.defaults.headers["Authorization"] = "";
        router.push({ name: "Login" });
    }
    if(status == 403) {
        router.push({ name: "Forbidden" });
    }
    if(status == 500) {
        toast.error("An error occurred, please contact the administrator!");
    }
});

export default instance;
