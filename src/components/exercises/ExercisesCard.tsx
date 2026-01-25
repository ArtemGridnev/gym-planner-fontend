import { Box } from "@mui/material";
import Card from "../dashboard/content/card/Card";
import CardHeader from "../dashboard/content/card/CardHeader";
import CardContent from "../dashboard/content/card/CardContent";
import Toolbar from "../toolbar/Toolbar";
import ExercisesListFilters from "./ExercisesListFilters";
import Alerts from "../Alerts";
import DataCardList, { type DataCardListColumnProps, type DataCardListRowProps } from "../dataCardList/DataCardList";
import DataCardListSkeleton from "../dataCardList/skeleton/DataCardListSkeleton";
import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Exercise } from "../../types/exercise";
import ToolbarLoadingIndicator from "../toolbar/ToolbarLoadingIndicator";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

type ExercisesCardProps = {
    exercises?: Exercise[];
    isLoading: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

export default function ExercisesCard({ exercises, isLoading, error, onAdd, onEdit, onDelete, onFiltersChange }: ExercisesCardProps) {
    const [rows, setRows] = useState<DataCardListRowProps[] | null>(null);

    useEffect(() => {
        if (exercises) {
            setRows(exercises?.map(exercise => { 
                return {
                    icon: FitnessCenterOutlined,
                    title: `${exercise.name} - ${exercise.category?.name}`,
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
                            onClick: () => onEdit(exercise.id) 
                        },
                        { icon: DeleteOutline, text: 'delete', onClick: () => onDelete(exercise.id) },
                    ]
                };
            }));
        }
    }, [exercises]);

    return (
        <Card>
            <CardHeader 
                title="Exercises"
                actions={[
                    {
                        icon: AddOutlined,
                        label: 'Create Exercise',
                        tooltip: 'Create Exercise', 
                        onClick: onAdd
                    }
                ]}
            />
            <CardContent>
                <Box 
                    sx={{ 
                        height: '100%',
                        overflowY: !rows ? 'hidden' : 'auto'
                    }}
                >
                    <Toolbar>
                        <ExercisesListFilters onChange={(filters) => onFiltersChange(filters)} />
                        {isLoading && rows && <ToolbarLoadingIndicator />}
                    </Toolbar>
                    <Box sx={{ padding: '1rem' }}>
                        <Alerts error={error} />
                        {rows && <DataCardList columns={columns} rows={rows} />}
                        {!rows && <DataCardListSkeleton columns={{ min: 3, max: 6 }} rows={8} icon={true} menuItems={true} />}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}