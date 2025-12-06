import { Box, Typography } from "@mui/material";
import type { MenuItemProps } from "../menu/MenuItem";
import type { ElementType } from "react";
import DataCardListItem from "./DataCardListItem";

export type DataCardListColumnProps = {
    field: string;
    name?: string;
    fullWidth?: boolean;
};

export type DataCardListRowProps = {
    icon: ElementType;
    title: string;
    data: Record<string, null | string | number>;
    menuItems?: MenuItemProps[];
    onClick?: () => void;
};

export type DataCardListProps = {
    columns: DataCardListColumnProps[];
    rows: DataCardListRowProps[];
    noDataMessage?: string;
};

export default function DataCardList({ columns, rows, noDataMessage = "No items here… yet." }: DataCardListProps) {
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
                {rows.length === 0 && <Typography variant="h6" sx={{ textAlign: 'center', }}>{noDataMessage}</Typography>}
                {rows.map((row, index) => (
                    <DataCardListItem columns={columns} row={row} key={index} />
                ))}
            </Box>
        </Box>
    );
}