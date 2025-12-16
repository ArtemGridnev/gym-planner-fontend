import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import { Box, LinearProgress } from "@mui/material";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import DataCardList, { type DataCardListColumnProps, type DataCardListRowProps } from "../../../components/dataCardList/DataCardList";
import useExercises from "../../../hooks/exercises/useExercises";
import Modal from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import ExerciseForm from "../../../components/forms/ExerciseForm";
import type { Exercise } from "../../../types/exercise";
import Alerts from "../../../components/Alerts";
import DataCardListSkeleton from "../../../components/dataCardList/skeleton/DataCardListSkeleton";
import ExercisesListFilter from "../../../components/ExercisesListFilter";
import Toolbar from "../../../components/toolbar/Toolbar";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Exercises() {
    const [filters, setFilters] = useState<Record<string, string>>();
    const { 
        exercises, 
        isLoading, 
        error, 
        fetchExercises,
        addExercise,
        updateExercise,
        deleteExercise
    } = useExercises({ filters });
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
            setRows(exercises?.map(exercise => { 
                return {
                    icon: FitnessCenterOutlined,
                    title: `${exercise.name} - ${exercise.category.name}`,
                    data: {
                        id: exercise.id,
                        description: exercise.description,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds.toLocaleString()} sec`,
                        weight: exercise.weight && `${exercise.weight.toLocaleString()} kg`
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
                };
            }
        ));
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
                    <Box 
                        sx={{ 
                            height: '100%',
                            overflowY: !exercises || exercises.length === 0 ? 'hidden' : 'auto'
                        }}
                    >
                        <Toolbar>
                            <ExercisesListFilter onChange={(filters) => setFilters(filters)} />
                            {isLoading && exercises && (
                                <LinearProgress 
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '2px',
                                        bottom: 0,
                                        left: 0
                                    }}
                                />
                            )}
                        </Toolbar>
                        <Box sx={{ padding: '1rem' }}>
                            {error && <Alerts error={error} />}
                            {!exercises && <DataCardListSkeleton columns={{ min: 3, max: 6 }} rows={8} icon={true} menuItems={true} />}
                            {exercises && <DataCardList columns={columns} rows={rows} />}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}