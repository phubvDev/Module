import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
            config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTczNTM2ODE2MiwiaWF0IjoxNzM0NTA0MTYyfQ.7e9zbvrOfiIamfqu_VpOjjhLDiwqV_wyhZL4pjc-zH4`;
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
