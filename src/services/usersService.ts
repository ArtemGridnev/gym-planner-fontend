import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};