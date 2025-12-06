import { Box } from "@mui/material";
import DataCardListItemSkeleton from "./DataCardListItemSkeleton";

export type DataCardListSkeletonProps = {
    columns: number | { min: number, max: number };
    rows: number;
    icon?: boolean;
    menuItems?: boolean;
};

export default function DataCardListSkeleton({ columns, rows, icon, menuItems }: DataCardListSkeletonProps) {
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
                {Array.from({ length: rows }).map((_, index) => (
                    <DataCardListItemSkeleton columns={columns} key={index} icon={icon} menuItems={menuItems} />
                ))}
            </Box>
        </Box>
    );
}