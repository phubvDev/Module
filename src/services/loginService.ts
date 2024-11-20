import axiosInstance from './index';

export const loginService = (userId: string, password: string) => {
    return axiosInstance.post('/auth/login', {
        userId,
        password,
    });
};