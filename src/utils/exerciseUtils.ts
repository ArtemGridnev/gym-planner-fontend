import type { ExerciseFormData } from "../hooks/exercises/useExerciseForm";
import type { CreateExercisePayload } from "../services/exercisesService";
import type { Exercise } from "../types/exercise";

export const exerciseFormDataToCreatePayload = (exercise: ExerciseFormData): CreateExercisePayload => {
    return {
        categoryId: `${exercise.category.id}`,
        name: exercise.name,
        description: exercise.description ?? null,
        sets: exercise.sets?.toString() ?? null,
        reps: exercise.reps?.toString() ?? null,
        durationSeconds: exercise.durationSeconds?.toString() ?? null,
        weight: exercise.weight?.toString() ?? null,
    };
};

export const exerciseToFormData = (exercise: Exercise): ExerciseFormData => {
    return {
        category: exercise.category,
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
        durationSeconds: exercise.durationSeconds,
        weight: exercise.weight,
    };
};