import type { ExerciseCategory } from './exerciseCategory';

export interface Exercise {
    id: number;
    category: ExerciseCategory;
    name: string;
    description: string | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
    weight: number | null;
}