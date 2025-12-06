import { useEffect, useState } from "react";
import useExercises from "../hooks/Exercises/useExercises";
import type { DataCardListColumnProps } from "./dataCardList/DataCardList";
import type { SelectableDataCardListRowProps } from "./dataCardList/SelectableDataCardList";
import { FitnessCenterOutlined } from "@mui/icons-material";
import Modal from "./modal/Modal";
import { Box, Button } from "@mui/material";
import SelectableDataCardList from "./dataCardList/SelectableDataCardList";
import type { Exercise } from "../types/exercise";

const exercisesColumns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

type ExercisesSelectPopupProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (ids: Exercise[]) => void;
};

export default function ExercisesSelectPopup({ open, onClose, onSubmit }: ExercisesSelectPopupProps) {
    const { 
        exercises,
        fetchExercises
    } = useExercises();
    const [exercisesRows, setExercisesRows] = useState<SelectableDataCardListRowProps[]>([]);
    const [ids, setIds] = useState<string[]>([]);

    const handleSubmit = (ids: string[]) => {
        const selectedExercises: Exercise[] = [];

        ids.forEach(id => {
            const exercise = exercises?.find(exercise => exercise.id === +id);

            if (exercise) {
                selectedExercises.push(exercise);
            }
        });
        
        onSubmit(selectedExercises);
    };
    
    useEffect(() => {
        if (exercises) {
            setExercisesRows(exercises?.map(exercise => ({
                id: exercise.id.toString(),
                icon: FitnessCenterOutlined,
                title: `${exercise.name} - ${exercise.category.name}`,
                data: {
                    id: exercise.id,
                    description: exercise.description,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                    weight: exercise.weight && `${exercise.weight} kg`
                }
            })));
        } else {
            setExercisesRows([]);
        }
    }, [exercises]);

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <Modal 
            open={open} 
            onClose={() => onClose()} 
            width="50rem"
        >
            <Modal.Header>Select exercises</Modal.Header>
            <Modal.Content>
                <Box sx={{ p: '0.75rem' }}>
                    <SelectableDataCardList rows={exercisesRows} columns={exercisesColumns} onChange={(ids) => setIds(ids)} />
                </Box>
            </Modal.Content>
            <Modal.Footer>
                <Button variant="contained" onClick={() => handleSubmit(ids)}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}