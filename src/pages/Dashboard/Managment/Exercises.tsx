import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import { Box, CircularProgress } from "@mui/material";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import DataCardList, { type DataCardListColumnProps, type DataCardListRowProps } from "../../../components/dataCardList/DataCardList";
import useExercises from "../../../hooks/Exercises/useExercises";
import Modal from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import ExerciseForm from "../../../components/forms/ExerciseForm";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Exercises() {
    const { exercises, loading, error, fetchExercises, deleteExercise } = useExercises();
    const [rows, setRows] = useState<DataCardListRowProps[]>([]);
    const [exerciseId, setExerciseId] = useState<number | null>(null);

    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        if (exercises) {
            setRows(exercises?.map(exercise => ({
                icon: FitnessCenterOutlined,
                title: `${exercise.name} - ${exercise.category.name}`,
                data: {
                    id: exercise.id,
                    description: exercise.description,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    durationSeconds: exercise.durationSeconds,
                    weight: exercise.weight
                },
                menuItems: [
                    { 
                        icon: EditOutlined, 
                        text: 'edit', 
                        onClick: () => {
                            setExerciseId(exercise.id); 
                            setFormOpen(true);
                        }  
                    },
                    { icon: DeleteOutline, text: 'delete', onClick: () => deleteExercise(exercise.id) },
                ]
            })));
        } else {
            setRows([]);
        }
    }, [exercises])

    return (
        <>
            <Modal 
                title="Create exercise"
                open={formOpen} 
                onClose={() => setFormOpen(false)} 
                width="30rem"
            >
                <Box sx={{ p: '0.75rem' }}>
                    <ExerciseForm 
                        onSuccess={() => {
                            setFormOpen(false); 
                            fetchExercises();
                        }} 
                        exerciseId={exerciseId}
                    />
                </Box>
            </Modal>

            <Card>
                <CardHeader 
                    title="Exercises"
                    actions={[
                        {
                            icon: AddOutlined,
                            label: 'Create Exercise',
                            onClick: () => {
                                setExerciseId(null);
                                setFormOpen(true);
                            }
                        }
                    ]}
                />
                <CardContent>
                    <Box sx={{ padding: '1rem' }}>
                        {loading && <CircularProgress size={20} color="inherit" />}
                        {error && <Box>{error}</Box>}
                        {exercises && !loading && <DataCardList columns={columns} rows={rows} />}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}