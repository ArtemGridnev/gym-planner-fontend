import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';
import type { Exercise } from '../types/exercise.ts';
import { objectToQuery } from '../utils/queryHelpers.ts';
import type { ExerciseCategory } from '../types/exerciseCategory.ts';

export type ExercisesQuery = {
    cursor?: number;
    limit?: number;
    search?: string;
    category?: string;
};

export const getExercises = async (filters?: ExercisesQuery) => {
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

export const getExercisesCategories = async (): Promise<ExerciseCategory[] | undefined> => {
    try {
        const response = await api.get("/exercises/categories");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export type CreateExercisePayload = {
    categoryId: number;
    name: string;
    description: string | null;
    sets?: string | null;
    reps?: string | null;
    durationSeconds?: string | null;
    weight?: string | null;
};

export const postExercise = async (data: CreateExercisePayload): Promise<Exercise | undefined> => {
    try {
        const response = await api.post("/exercises", data);

        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

type UpdateExercisePayload = Partial<CreateExercisePayload>;

export const updateExercise = async (data: UpdateExercisePayload & { id: number }): Promise<Exercise | undefined>  => {
    const { id, ...payload } = data;

    try {
        const response = await api.patch(`/exercises/${id}`, payload);
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