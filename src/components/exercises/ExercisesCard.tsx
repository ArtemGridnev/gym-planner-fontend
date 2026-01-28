import { Box } from "@mui/material";
import Card from "../dashboard/content/card/Card";
import CardHeader from "../dashboard/content/card/CardHeader";
import CardContent from "../dashboard/content/card/CardContent";
import Toolbar from "../toolbar/Toolbar";
import ExercisesListFilters from "./ExercisesListFilters";
import DataCardList, { type DataCardListColumnProps, type DataCardListRowProps } from "../dataCardList/DataCardList";
import DataCardListSkeleton from "../dataCardList/skeleton/DataCardListSkeleton";
import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import React, { useMemo } from "react";
import type { Exercise } from "../../types/exercise";
import ToolbarLoadingIndicator from "../toolbar/ToolbarLoadingIndicator";
import Alerts from "../Alerts";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

type ExercisesCardProps = {
    loadMoreRef?: React.RefObject<HTMLDivElement | null>;
    exercises?: Exercise[];
    isPending: boolean;
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

export default function ExercisesCard({ 
    loadMoreRef, 
    exercises, 
    isPending, 
    hasNextPage, 
    error, 
    onAdd, 
    onEdit, 
    onDelete, 
    onFiltersChange 
}: ExercisesCardProps) {
    const rows = useMemo<DataCardListRowProps[] | null>(() => {
        if (!exercises) return null;

        return exercises?.map(exercise => { 
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
        });
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
                        {isPending && rows && <ToolbarLoadingIndicator />}
                    </Toolbar>
                    <Box sx={{ display: 'flex', padding: '1rem', gap: '1rem', flexDirection: 'column' }}>
                        <Alerts error={error} />
                        {!isPending && rows && <DataCardList columns={columns} rows={rows} />}
                        {(isPending || hasNextPage) && <DataCardListSkeleton ref={loadMoreRef} columns={{ min: 3, max: 6 }} rows={6} icon={true} menuItems={true} />}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}