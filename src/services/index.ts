import axios from 'axios';

import { baseUrl } from '../const/api.ts';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        console.log("token", token);
        if (token) {
            config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTczMjkzNjg4MCwiaWF0IjoxNzMyMDcyODgwfQ.Fe2yTmbdjdJVFbZVr8PkZQ5V6bPCkMvQ4N6zF-0hJjc`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/module/login';
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
