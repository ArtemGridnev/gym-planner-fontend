import { useEffect } from 'react';
import { exercisesFilter as fields } from '../filters/exercisesFilter'
import useFilters from '../hooks/filters/useFilters'
import ToolbarFilters from './toolbar/ToolbarFilters';

type ExercisesListFilterProps = {
    onChange: (filters: Record<string, string>) => void
};

export default function ExercisesListFilter({ onChange }: ExercisesListFilterProps) {
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