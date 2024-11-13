import axiosInstance from './index';

export const loginService = (username: string, password: string) => {
    return axiosInstance.post('/api/login', {
        username,
        password,
    });
};