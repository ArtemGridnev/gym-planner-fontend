import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';
import type { TrainExercise } from '../types/trainExercise.ts';

export const getTrainExercisesList = async (id: number): Promise<TrainExercise[] | undefined> => {
    try {
        const response = await api.get(`/trains/${id}/exercises`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export type TrainExerciseUpdate = {
    id: number;
    exerciseId?: number;
} | {
    exerciseId: number;
};

type TrainExercisesUpdateData = {
    exercises: TrainExerciseUpdate[];
};

export const updateTrainExercises = async (id: number, data: TrainExercisesUpdateData): Promise<(TrainExercise & { tempId?: number })[] | undefined> => {
    try {
        const response = await api.patch(`/trains/${id}/exercises`, data);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};