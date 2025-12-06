import { Box, Skeleton } from '@mui/material';
import type { ReactNode } from 'react';

type SortableItemProps = {
    children: ReactNode
};

export function SortableItemSkeleton({ children }: SortableItemProps) {

  return (
    <Box 
        sx={{
            position: 'relative',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
        }} 
    >
        <Box>
            <Skeleton 
                variant="rectangular"
                sx={{
                    width: '1.5rem',
                    height: '1.5rem'
                }} 
            />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            {children}
        </Box>
    </Box>
  );
}