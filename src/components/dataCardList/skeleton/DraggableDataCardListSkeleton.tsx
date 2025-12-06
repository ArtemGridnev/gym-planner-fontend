import { Box } from "@mui/material";
import { SortableItemSkeleton } from "../../dnd/SortableItemSkeleton";
import DataCardListItemSkeleton from "./DataCardListItemSkeleton";

type DraggableDataCardListSkeletonProps = {
    columns: number | { min: number, max: number };
    rows: number;
    icon?: boolean;
    menuItems?: boolean;
};

export default function DraggableDataCardListSkeleton({ columns, rows, icon, menuItems }: DraggableDataCardListSkeletonProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column'
            }}
        >
            {Array.from({ length: rows }).map((_, index) => (
                <SortableItemSkeleton>
                    {<DataCardListItemSkeleton columns={columns} key={index} icon={icon} menuItems={menuItems} />}
                </SortableItemSkeleton>
            ))}
        </Box>
    );
}