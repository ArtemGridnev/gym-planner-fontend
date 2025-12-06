import { Box } from "@mui/material";
import DataCard from "./DataCard";
import type { DataCardListColumnProps, DataCardListRowProps } from "./DataCardList";

type DataCardListItemProps = {
    columns: DataCardListColumnProps[];
    row: DataCardListRowProps;
};

export default function DataCardListItem({ columns, row }: DataCardListItemProps) {
    return (
        <DataCard
            title={row.title}
            icon={row.icon}
            menuItems={row.menuItems}
            {...(row?.onClick && {onClick: () => row.onClick?.()})}
        >
            <Box sx={{ 
                containerName: 'DataCardContainer',
                containerType: 'inline-size'
            }}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: '1rem',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        containerType: 'inline-size',
                        '@container DataCardContainer (max-width: 300px)': {
                            gridTemplateColumns: '1fr',
                        },
                    }}
                >
                    {columns.map((column, index) =>  {
                        const rawValue = row.data[column.field];

                        if (rawValue) {
                            let value;

                            switch (typeof rawValue) {
                                case 'number':
                                    value = rawValue.toLocaleString();
                                    break;
                                default:
                                    value = rawValue;
                            }

                            return (
                                <Box 
                                    sx={{
                                        ...(column.fullWidth && { gridColumn: '1 / -1' }),
                                    }} 
                                    key={index}
                                >
                                    {column.name && <Box sx={{ color: 'text.secondary' }} component="span">{column.name}: </Box>}
                                    {value}
                                </Box>
                            )
                        } 
                    }
                        
                    )}
                </Box>
            </Box>
            
        </DataCard>
    )
}