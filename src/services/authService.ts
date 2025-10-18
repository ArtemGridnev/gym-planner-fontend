import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export const register = async (data: RegisterData) => {
    try {
        const response = await api.post("/auth/register", data);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const logout = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};