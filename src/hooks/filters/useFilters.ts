import useFiltersState from "./useFiltersState";
import type { FilterFieldSchema } from "../../types/filterFieldSchema";
import { useEffect, useMemo, useRef, useState } from "react";

export default function useFilters(fields: FilterFieldSchema[]) {
    const initialValues = fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
    const [filters, setFilters] = useState<Record<string, string>>({});

    const fieldsMap = useMemo(() => {
        return new Map(fields.map(f => [f.name, f]));
    }, [fields])

    const {
        filters: values,
        handleChange: stateHandleChange,
        setFiltersData,
        cleanFilters
    } = useFiltersState(initialValues);

    const debounceTimeouts = useRef(new Map<string, number>());

    const handleChange = (name: string, value: string) => {
        const newValues = stateHandleChange(name, value);

        const field = fieldsMap.get(name);

        if (!field) return;

        const debounce = field.debounce;

        if (debounce) {
            clearTimeout(debounceTimeouts.current.get(name));

            debounceTimeouts.current.set(
                name, 
                setTimeout(() => {
                    setFilters(newValues);
                }, debounce)
            );
        } else {
            setFilters(newValues);
        }
    };

    useEffect(() => {
        return () => {
            debounceTimeouts.current.forEach(clearTimeout);
        };
    }, []);

    return {
        filters,
        values,
        handleChange,
        setFiltersData,
        cleanFilters
    };
}