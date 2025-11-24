import { Box, CircularProgress } from "@mui/material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import type { Train } from "../../../types/train";
import useTrain from "../../../hooks/Trains/useTrain";
import DraggableDataCardList, { type DraggableDataCardListRowProps } from "../../../components/dataCardList/DraggableDataCardList";
import type { DataCardListColumnProps } from "../../../components/dataCardList/DataCardList";
import { useEffect, useState } from "react";

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
        updateTrainExercises
    } = useTrain(+id!);
    const [rows, setRows] = useState<DraggableDataCardListRowProps[]>([]);

    useEffect(() => {
        if (train?.exercises) {
            const trainExercises = train.exercises;

            setRows(trainExercises?.map(trainExercise => {
                const exercise = trainExercise.exercise;

                return {
                    id: trainExercise.id.toString(),
                    icon: FitnessCenterOutlined,
                    title: `${exercise.name} - ${exercise.category?.name}`,
                    data: {
                        id: exercise.id,
                        description: exercise.description,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                        weight: exercise.weight && `${exercise.weight} kg`,
                        orderIndex: trainExercise.orderIndex
                    },
                    menuItems: [
                        { 
                            icon: EditOutlined, 
                            text: 'edit', 
                            onClick: () => {
                                alert('edit');
                            }  
                        },
                        { icon: DeleteOutline, text: 'delete', onClick: () => alert('delete') },
                    ]
                }
            }));
        } else {
            setRows([]);
        }
    }, [train]);

    return (
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
                            // setTrainId(null);
                            // setFormOpen(true);
                        }
                    }
                ]}
            />
            <CardContent>
                <Box sx={{ padding: '1rem' }}>
                    {loading && <CircularProgress size={25} color="inherit" sx={{ display: 'block', margin: 'auto' }} />}
                    {error && <Box>{error}</Box>}
                    {train?.exercises && !loading && (
                        <Box
                            sx={{
                                maxWidth: '40rem',
                                margin: 'auto'
                            }}
                        >
                            <DraggableDataCardList 
                                columns={columns} 
                                rows={rows}
                                onChange={(orderedRows) => {
                                    setRows(orderedRows);
                                    updateTrainExercises(orderedRows.map(row => ({ id: +row.id })))
                                }}
                             />
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}