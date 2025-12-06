import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../dnd/SortableItem";
import type { DataCardListProps, DataCardListRowProps } from "./DataCardList";
import DataCardListItem from "./DataCardListItem";
import { Box, Typography } from "@mui/material";
import DndProvider from "../dnd/DndProvider";

export type DraggableDataCardListRowProps = DataCardListRowProps & {
    id: string
};

type DraggableDataCardListProps = Omit<DataCardListProps, 'rows'> & {
    rows: DraggableDataCardListRowProps[];
    onChange: (rows: DraggableDataCardListRowProps[]) => void;
};

export default function DraggableDataCardList({ columns, rows, onChange, noDataMessage = "No items here… yet." }: DraggableDataCardListProps) {
    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            const oldIndex = rows.findIndex(row => row.id === active.id);
            const newIndex = rows.findIndex(row => row.id === over.id);

            const orderedRows = arrayMove(rows, oldIndex, newIndex);

            onChange(orderedRows);
        }
    };

    return (
        <DndProvider onDragEnd={handleDragEnd}>
            <SortableContext
                items={rows}
                strategy={verticalListSortingStrategy}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column'
                    }}
                >
                    {rows.length === 0 && <Typography variant="h6" sx={{ textAlign: 'center', }}>{noDataMessage}</Typography>}
                    {rows.map((row) => (
                        <SortableItem key={row.id} id={row.id}>
                            {<DataCardListItem columns={columns} row={row} />}
                        </SortableItem>
                    ))}
                </Box>
            </SortableContext>
        </DndProvider>
    );
}