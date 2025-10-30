import { Box } from "@mui/material";
import DataCard from "./DataCard";
import type { MenuItemProps } from "../menu/MenuItem";
import type { ElementType } from "react";

export type DataCardListColumnProps = {
    field: string;
    name?: string;
    fullWidth?: boolean;
};

export type DataCardListRowProps = {
    icon: ElementType;
    title: string;
    data: Record<string, any>;
};

export type DataCardListProps = {
    columns: DataCardListColumnProps[];
    rows: DataCardListRowProps[];
    rowMenuItems?: MenuItemProps[];
};

export default function DataCardList({ columns, rows, rowMenuItems }: DataCardListProps) {
    return (
        <Box sx={{
            containerName: 'CardListContainer',
            containerType: 'inline-size'
        }}>
            <Box
                sx={{
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    '@container CardListContainer (max-width: 700px)': {
                        gridTemplateColumns: '1fr',
                    },
                }}
            >
                {rows.map((row, index) => (
                    <DataCard
                        title={row.title}
                        icon={row.icon}
                        menuItems={rowMenuItems}
                        key={index}
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
                                {columns.map((column, index) => 
                                    row.data[column.field] && (
                                        <Box 
                                            sx={{
                                                ...(column.fullWidth && { gridColumn: '1 / -1' }),
                                            }} 
                                            key={index}
                                        >
                                            {column.name && <Box sx={{ color: 'text.secondary' }} component="span">{column.name}: </Box>}
                                            {row.data[column.field]}
                                        </Box>
                                    )
                                )}
                            </Box>
                        </Box>
                        
                    </DataCard>
                ))}
            </Box>
        </Box>

    );
}