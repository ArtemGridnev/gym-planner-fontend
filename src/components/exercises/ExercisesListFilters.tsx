import { useEffect, useMemo } from 'react';
import useFilters from '../../hooks/filters/useFilters'
import ToolbarFilters from '../toolbar/ToolbarFilters';
import { useExerciseCategories } from '../../queries/exercises/hooks/useExerciseCategories';
import { getExerciseFilterFields } from '../../filters/exercisesFilter.schema';
import type { ExerciseCategory } from '../../types/exerciseCategory';
import type { SearchSelectOption } from '../../types/form/formFieldSchema';

type ExercisesListFiltersProps = {
    onChange: (filters: Record<string, string>) => void
};

export default function ExercisesListFilters({ onChange }: ExercisesListFiltersProps) {
    const {
        data: categories
    } = useExerciseCategories();

    const fields = useMemo(() => {
        if (!categories) return [];

        const options = categories.map((category: ExerciseCategory) => ({ id: category.id, value: category, label: category.name } as SearchSelectOption));

        return getExerciseFilterFields(options);
    }, [categories]);

    const {
        filters,
        values,
        handleChange
    } = useFilters(fields);

    useEffect(() => {
        onChange(filters);
    }, [filters]);

    return (
        <ToolbarFilters 
            fields={fields} 
            filters={values} 
            handleChange={handleChange} 
        />
    );
}