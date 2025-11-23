import { useEffect, useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../dnd/SortableItem";
import type { DataCardListColumnProps, DataCardListProps, DataCardListRowProps } from "./DataCardList";
import DataCardListItem from "./DataCardListItem";
import { Box } from "@mui/material";

export type DraggableDataCardListRowProps = DataCardListRowProps & {
    id: string
}

type DraggableDataCardListProps = {
    columns: DataCardListColumnProps[];
    rows: DraggableDataCardListRowProps[];
}

export default function DraggableDataCardList({ columns, rows }: DraggableDataCardListProps) {
    const [items, setItems] = useState<DraggableDataCardListRowProps[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    useEffect(() => {
        setItems(rows);
    }, [rows]);

    useEffect(() => {
        console.log('items', items);
    }, [items]);

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column'
                    }}
                >
                    {items.map((row) => (
                        <SortableItem key={row.id} id={row.id}>
                            {<DataCardListItem columns={columns} row={row} />}
                        </SortableItem>
                    ))}
                </Box>
            </SortableContext>
        </DndContext>
    );
}