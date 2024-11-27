import axiosInstance from './index';

export const loginService = (userId: string, password: string) => {
    return axiosInstance.post('http://13.124.14.236:8386/api/avansoft/module/auth/login', {
        userId,
        password,
    });
};