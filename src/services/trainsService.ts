import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';
import type { Train } from '../types/train.ts';

export const getTrainsList = async () => {
    try {
        const response = await api.get("/trains");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const getTrain = async (id: number): Promise<Train | undefined> => {
    try {
        const response = await api.get(`/trains/${id}`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

type TrainData = {
    name: string;
    recurrenceCron: string;
};

export const postTrain = async (data: TrainData) => {
    try {
        const response = await api.post("/trains", data);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

type PartialTrainData = Partial<TrainData>;

export const updateTrain = async (id: number, data: PartialTrainData) => {
    try {
        const response = await api.patch(`/trains/${id}`, data);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};

export const deleteTrain = async (id: number) => {
    try {
        const response = await api.delete(`/trains/${id}`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};