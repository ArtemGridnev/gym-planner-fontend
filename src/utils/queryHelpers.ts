export const objectToQuery = (obj: Record<string, string | number | string[] | number[] | undefined>) => {
    return new URLSearchParams(Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined ) {
            if (typeof value === 'string') {
                if (value.trim()) {
                    acc[key] = value.trim();
                }
            } else if (typeof value === 'number') {
                acc[key] = `${value}`;
            } else if (value instanceof Array) {
                acc[key] = value.join(',');
            }
        }

        return acc;
    }, {} as Record<string, string>)).toString();
};