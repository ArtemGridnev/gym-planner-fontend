import type { TrainFormData } from "../hooks/trains/useTrainFormController";
import type { Train } from "../types/train";

export const trainToFormData = (train: Train): TrainFormData => {
    return {
        name: train.name,
        recurrenceCron: train.recurrenceCron,
    };
};