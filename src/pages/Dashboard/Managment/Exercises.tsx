import type { MenuItemProps } from "../../../components/menu/MenuItem";
import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import DataCardList, { type DataCardListColumnProps, type DataCardListRowProps } from "../../../components/dataCardList/DataCardList";
import useExercises from "../../../hooks/useExercises";
import Modal from "../../../components/modal/Modal";
import { useState } from "react";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Exercises() {
    const { exercises, loading, error } = useExercises();

    const [formOpen, setFormOpen] = useState(false);

    const rows: DataCardListRowProps[] = exercises?.map(exercise => ({
            icon: FitnessCenterOutlined,
            title: exercise.name,
            data: {
                id: exercise.id,
                description: exercise.description,
                sets: exercise.sets,
                reps: exercise.reps,
                durationSeconds: exercise.durationSeconds,
                weight: exercise.weight
            }
        })
    ) ?? [];

    const rowMenuItems: MenuItemProps[] = [
        { icon: EditOutlined, text: 'edit', onClick: () => console.log('click') },
        { icon: DeleteOutline, text: 'delete', onClick: () => console.log('click') },
    ];
    
    return (
        <>
            <Modal 
                title="Create exercise"
                open={formOpen} 
                onClose={() => setFormOpen(false)} 
                width="40rem" 
                height="40rem"
            >
                <Box sx={{ p: '0.75rem' }}>
                    Text
                </Box>
            </Modal>

            <Card>
                <CardHeader>
                    <Typography variant="h5" component="h1" sx={{ paddingInline: '0.5rem' }}>Exercises</Typography>
                    <IconButton onClick={() => setFormOpen(true)} sx={{ marginInlineStart: 'auto' }}>
                        <AddOutlined />
                    </IconButton>
                </CardHeader>
                <CardContent>
                    <Box sx={{ padding: '1rem' }}>
                        {loading && <CircularProgress size={20} color="inherit" />}
                        {error && <Box>{error}</Box>}
                        {exercises && !loading && <DataCardList columns={columns} rows={rows} rowMenuItems={rowMenuItems} />}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}