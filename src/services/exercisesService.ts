import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';

export const getExercisesList = async () => {
    try {
        const response = await api.get("/exercises");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};