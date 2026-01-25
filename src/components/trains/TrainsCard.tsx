import { useEffect, useState } from "react";
import Card from "../dashboard/content/card/Card";
import type { Train } from "../../types/train";
import { AddOutlined, DeleteOutline, EditOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import { cronToDays } from "../../utils/cron";
import type { DataCardListColumnProps, DataCardListRowProps } from "../dataCardList/DataCardList";
import { Box } from "@mui/material";
import CardHeader from "../dashboard/content/card/CardHeader";
import CardContent from "../dashboard/content/card/CardContent";
import DataCardListSkeleton from "../dataCardList/skeleton/DataCardListSkeleton";
import DataCardList from "../dataCardList/DataCardList";
import Alerts from "../Alerts";
import { useNavigate } from "react-router-dom";

type TrainsCardProps = {
    trains?: Train[];
    isLoading: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

const columns: DataCardListColumnProps[] = [
    { field: 'weekDays', name: 'Recurrence Days', fullWidth: true }
];

export default function TrainsCard({ trains, isLoading, error, onAdd, onEdit, onDelete, onFiltersChange }: TrainsCardProps) {
    const navigate = useNavigate();
    const [rows, setRows] = useState<DataCardListRowProps[]>([]);

    useEffect(() => {
        if (trains) {
            setRows(trains?.map(train => ({
                icon: SportsMartialArtsOutlined,
                title: train.name,
                data: {
                    weekDays: cronToDays(train.recurrenceCron)
                },
                menuItems: [
                    { 
                        icon: EditOutlined, 
                        text: 'edit', 
                        onClick: () => onEdit(train.id)
                    },
                    { 
                        icon: DeleteOutline, 
                        text: 'delete', 
                        onClick: () => onDelete(train.id) 
                    },
                ],
                onClick: () => navigate(`/managment/trains/${train.id}`)
            })));
        } else {
            setRows([]);
        }
    }, [trains]);

    return (
        <Card>
            <CardHeader 
                title="Trainings"
                actions={[
                    {
                        icon: AddOutlined,
                        label: 'Create Train',
                        tooltip: 'Create Train',
                        onClick: onAdd
                    }
                ]}
            />
            <CardContent>
                <Box 
                    sx={{ 
                        height: '100%',
                        padding: '1rem',
                        overflowY: isLoading ? 'hidden' : 'auto'
                    }}
                >
                    <Alerts error={error} />
                    {isLoading && <DataCardListSkeleton columns={1} rows={8} icon={true} menuItems={true} />}
                    {trains && !isLoading && <DataCardList columns={columns} rows={rows} />}
                </Box>
            </CardContent>
        </Card>
    );
}