import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function DndProvider({ children, onDragEnd }: { children: React.ReactNode, onDragEnd: (event: any) => void }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}