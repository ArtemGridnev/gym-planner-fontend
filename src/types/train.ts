import type { TrainExercise } from "./trainExercise";

export interface Train {
    id: number;
    recurrenceCron: string;
    name: string;
    exercises?: TrainExercise[];
};