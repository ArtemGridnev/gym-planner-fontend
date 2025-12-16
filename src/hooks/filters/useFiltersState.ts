import { useState } from "react";

export default function useFiltersState(initialValues: Record<string, string>) {
    const [filters, setFilters] = useState(initialValues);

    const handleChange = (name: string, value: string): Record<string, string> => {
        const newValues = { ...filters, ...{ [name]: value }}

        setFilters(newValues);

        return newValues;
    };

    const setFiltersData = (data: Record<string, string>) => {
        const currData = { ...filters };

        Object.keys(currData).forEach(key => {
            currData[key] = data[key];
        });

        setFilters(currData);
    };

    const cleanFilters = () => {
        setFilters(initialValues);
    };

    return {
        filters,
        handleChange,
        setFiltersData,
        cleanFilters
    };
}