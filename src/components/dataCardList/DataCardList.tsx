import { Box } from "@mui/material";
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
    data: Record<string, any>;
    menuItems?: MenuItemProps[];
    onClick?: () => void;
};

export type DataCardListProps = {
    columns: DataCardListColumnProps[];
    rows: DataCardListRowProps[];
};

export default function DataCardList({ columns, rows }: DataCardListProps) {
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
                    <DataCardListItem columns={columns} row={row} key={index} />
                ))}
            </Box>
        </Box>
    );
}