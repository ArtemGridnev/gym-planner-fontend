import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';
import type { Exercise } from '../types/exercise.ts';
import { objectToQuery } from '../utils/queryHelpers.ts';

export type ExercisesFilters = {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
};

export const getExercises = async (filters?: ExercisesFilters) => {
    const query = filters ? objectToQuery(filters) : '';

    try {
        const response = await api.get(`/exercises${query ? `?${query}` : ''}`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const getExercise = async (id: number): Promise<Exercise | undefined> => {
    try {
        const response = await api.get(`/exercises/${id}`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const getExercisesCategories = async () => {
    try {
        const response = await api.get("/exercises/categories");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

type ExerciseData = {
    categoryId: string;
    name: string;
    description: string | null;
    sets?: string | null;
    reps?: string | null;
    durationSeconds?: string | null;
    weight?: string | null;
};

export const postExercise = async (data: ExerciseData) => {
    try {
        const response = await api.post("/exercises", data);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

type PartialExerciseData = Partial<ExerciseData>;

export const updateExercise = async (id: number, data: PartialExerciseData) => {
    try {
        const response = await api.patch(`/exercises/${id}`, data);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const deleteExercise = async (id: number) => {
    try {
        const response = await api.delete(`/exercises/${id}`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};