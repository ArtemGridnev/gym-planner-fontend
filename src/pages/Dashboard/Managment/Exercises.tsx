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
import type { Exercise } from "../../../types/exercise";
import Alerts from "../../../components/Alerts";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Exercises() {
    const { 
        exercises, 
        loading, 
        error, 
        fetchExercises,
        addExercise,
        updateExercise,
        deleteExercise
    } = useExercises();
    const [rows, setRows] = useState<DataCardListRowProps[]>([]);
    const [exerciseId, setExerciseId] = useState<number | null>(null);
    const [formOpen, setFormOpen] = useState(false);

    const onFormSubmit = (exercise: Exercise) => {
        setFormOpen(false); 
        
        if (exerciseId) {
            updateExercise(exercise);
        } else {
            addExercise(exercise);
        }
    };

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
                    durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                    weight: exercise.weight && `${exercise.weight} kg`
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
    }, [exercises]);

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <>
            <Modal 
                open={formOpen} 
                onClose={() => setFormOpen(false)} 
                width="30rem"
            >
                <Modal.Header>{exerciseId ? "Update Exercise" : "Create exercise"}</Modal.Header>
                <Modal.Content>
                    <Box sx={{ p: '0.75rem' }}>
                        <ExerciseForm 
                            onSuccess={onFormSubmit} 
                            exerciseId={exerciseId}
                        />
                    </Box>
                </Modal.Content>
            </Modal>

            <Card>
                <CardHeader 
                    title="Exercises"
                    actions={[
                        {
                            icon: AddOutlined,
                            label: 'Create Exercise',
                            tooltip: 'Create Exercise', 
                            onClick: () => {
                                setExerciseId(null);
                                setFormOpen(true);
                            }
                        }
                    ]}
                />
                <CardContent>
                    <Box sx={{ padding: '1rem' }}>
                        {loading && <CircularProgress size={25} color="inherit" sx={{ display: 'block', margin: 'auto' }} />}
                        {error && <Alerts error={error} />}
                        {exercises && !loading && <DataCardList columns={columns} rows={rows} />}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}