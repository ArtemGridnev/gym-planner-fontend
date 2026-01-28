import { Box, Skeleton, type BoxProps } from "@mui/material";
import DataCardListItemSkeleton from "./DataCardListItemSkeleton";

type SelectableDataCardListSkeletonProps = BoxProps &{
    columns: number | { min: number, max: number };
    rows: number;
    icon?: boolean;
    menuItems?: boolean;
};

export default function SelectableDataCardListSkeleton({ columns, rows, icon, menuItems, ...props }: SelectableDataCardListSkeletonProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column'
            }}
            {...props}
        >
            {Array.from({ length: rows }).map((_, index) => (
                <Box 
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ padding: '0.56125rem'}}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                width: '1.5rem',
                                height: '1.5rem'
                            }} 
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <DataCardListItemSkeleton columns={columns} key={index} icon={icon} menuItems={menuItems} />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}