import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { DragIndicatorOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { ReactNode } from 'react';

type SortableItemProps = {
    id: string,
    children: ReactNode
};

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });
  
  return (
    <Box 
        sx={{
            position: 'relative',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            transition,
            ...(transform && {
                transform: `${CSS.Transform.toString(transform)}`,
            }),
            zIndex: isDragging ? 10 : 1,
        }} 
    >
        <Box
            sx={{ 
                color: 'text.secondary',
                cursor: isDragging ? "grabbing" : "grab",
            }} 
            ref={setNodeRef}
            {...attributes} 
            {...listeners}
        >
            <DragIndicatorOutlined />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            {children}
        </Box>
    </Box>
  );
}