import axiosInstance from './index';

export const loginService = (userId: string, password: string) => {
    return axiosInstance.post('http://localhost:8080/api/avansoft/module/auth/login', {
        userId,
        password,
    });
};