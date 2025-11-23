import type { Exercise } from "./exercise";

export interface TrainExercise {
    id: number;
    exercise: Exercise;
    orderIndex: number;
}