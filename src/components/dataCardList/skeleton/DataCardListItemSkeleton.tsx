import { Box, Skeleton } from "@mui/material";
import DataCardSkeleton from "./DataCardSkeleton";
import { getRandomInt } from "../../../utils/random";

type DataCardListItemSkeletonProps = {
    icon?: boolean;
    columns: number | { min: number, max: number };
    menuItems?: boolean;
};

export default function DataCardListItemSkeleton({ icon, columns, menuItems }: DataCardListItemSkeletonProps) {
    const columnsConut = typeof columns === 'object' ? getRandomInt(columns.min, columns.max) : columns;

    return (
        <DataCardSkeleton icon={icon} menuItems={menuItems}>
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
                    {Array.from({ length: columnsConut }).map((_, index) => (
                        <Skeleton 
                            sx={{ width: `${getRandomInt(25, 75)}%` }} 
                            key={index}
                        />
                    ))}
                </Box>
            </Box>
            
        </DataCardSkeleton>
    )
}