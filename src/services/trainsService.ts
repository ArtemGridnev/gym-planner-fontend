import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';

export const getTrainsList = async () => {
    try {
        const response = await api.get("/trains");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};