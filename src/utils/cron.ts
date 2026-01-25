export const cronToDays = (cron: string): string => {
    const days: Record<string, string> = {
        '0': 'Sun',
        '1': 'Mon',
        '2': 'Tue',
        '3': 'Wed',
        '4': 'Thu',
        '5': 'Fri',
        '6': 'Sat'
    };

    const parts = cron?.trim()?.split(' ');
        
    const weekDaysKeys = parts[4]?.replaceAll('*', '').split(',') || [];

    return weekDaysKeys.map((key) => days[key]).join(', ');
};