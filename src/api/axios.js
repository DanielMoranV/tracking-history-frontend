/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
//import { useResponse } from '../composables/useResponse';

const api_url = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: api_url,
    timeout: 5000
});

instance.interceptors.request.use(
    (config) => {
        const { token } = useAuthStore();
        if (token) {
            config.headers.Authorization = 'bearer ' + token;
            console.log(config.headers);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log(error);
        let errData = {
            message: error.response.data.error,
            status_code: 'offline',
            success: false,
            details: null
        };
        if (error.response.me) {
            errData = error.response.data;

            if ([401, 403].indexOf(error.response.status) !== -1) {
                //useResponse().showAlert(errData);
                console.log('if', errData);
            }
        }
        return Promise.reject(errData);
    }
);

export default instance;
