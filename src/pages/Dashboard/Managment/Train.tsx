import { Box } from "@mui/material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import { AddOutlined, DeleteOutline, FitnessCenterOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import type { Train } from "../../../types/train";
import useTrain from "../../../hooks/Trains/useTrain";
import DraggableDataCardList, { type DraggableDataCardListRowProps } from "../../../components/dataCardList/DraggableDataCardList";
import type { DataCardListColumnProps } from "../../../components/dataCardList/DataCardList";
import { useEffect, useState } from "react";
import ExercisesSelectPopup from "../../../components/ExercisesSelectPopup";
import Alerts from "../../../components/Alerts";
import DraggableDataCardListSkeleton from "../../../components/dataCardList/skeleton/DraggableDataCardListSkeleton";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Train() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        loading,
        train,
        error,
        addTrainExercises,
        updateTrainExercisesOrder,
        deleteTrainExercise
    } = useTrain(+id!);
    const [rows, setRows] = useState<DraggableDataCardListRowProps[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    
    useEffect(() => {
        if (train?.exercises) {
            const trainExercises = train.exercises;

            setRows(trainExercises?.map(trainExercise => {
                const exercise = trainExercise.exercise;

                return {
                    id: trainExercise.id.toString(),
                    icon: FitnessCenterOutlined,
                    title: `${exercise.name} - ${exercise.category?.name} (${trainExercise.id})`,
                    data: {
                        id: exercise.id,
                        description: exercise.description,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                        weight: exercise.weight && `${exercise.weight} kg`
                    },
                    menuItems: trainExercise.id > 0 ? [
                        { icon: DeleteOutline, text: 'delete', onClick: () => deleteTrainExercise(trainExercise.id) },
                    ] : []
                };
            }));
        } else {
            setRows([]);
        }
    }, [train]);

    return (
        <>
            <ExercisesSelectPopup 
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={(exercises) => {
                    setFormOpen(false);
                    addTrainExercises(exercises);
                }}
            />
            <Card>
                <CardHeader 
                    onBack={() => navigate('/managment/trains')}
                    title={`Training${train ? ` - ${train.name}` : ''}`}
                    actions={[
                        {
                            icon: AddOutlined,
                            label: 'Add Exercises',
                            tooltip: 'Add Exercises',
                            onClick: () => {
                                setFormOpen(true);
                            }
                        }
                    ]}
                />
                <CardContent>
                    <Box 
                        sx={{ 
                            height: '100%',
                            padding: '1rem',
                            overflowY: loading ? 'hidden' : 'auto'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '40rem',
                                margin: 'auto',
                            }}
                        >
                            {error && <Alerts error={error} />}
                            {loading && <DraggableDataCardListSkeleton columns={{ min: 3, max: 6 }} rows={8} icon={true} menuItems={true} />}
                            {train?.exercises && !loading && (
                                <DraggableDataCardList 
                                    columns={columns} 
                                    rows={rows}
                                    onChange={(orderedRows) => {
                                        setRows(orderedRows);
                                        updateTrainExercisesOrder(orderedRows.map(row => ({ id: +row.id })))
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}