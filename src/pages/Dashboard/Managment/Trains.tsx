import { Box, CircularProgress } from "@mui/material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import { AddOutlined, DeleteOutline, EditOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import { useEffect, useState } from "react";
import type { DataCardListColumnProps, DataCardListRowProps } from "../../../components/dataCardList/DataCardList";
import useTrains from "../../../hooks/Trains/useTrains";
import DataCardList from "../../../components/dataCardList/DataCardList";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Trains() {
    const { 
        trains, 
        loading, 
        error, 
        addTrain,
        updateTrain,
        deleteTrain
    } = useTrains();
    const [rows, setRows] = useState<DataCardListRowProps[]>([]);
    const [trainId, setTrainId] = useState<number | null>(null);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        if (trains) {
            setRows(trains?.map(train => ({
                icon: SportsMartialArtsOutlined,
                title: train.name,
                data: {},
                menuItems: [
                    { 
                        icon: EditOutlined, 
                        text: 'edit', 
                        onClick: () => {
                            setTrainId(train.id); 
                            setFormOpen(true);
                        }  
                    },
                    { icon: DeleteOutline, text: 'delete', onClick: () => deleteTrain(train.id) },
                ]
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
                        onClick: () => console.log('click')
                    }
                ]}
            />
            <CardContent>
                <Box sx={{ padding: '1rem' }}>
                    {loading && <CircularProgress size={20} color="inherit" />}
                    {error && <Box>{error}</Box>}
                    {trains && !loading && <DataCardList columns={columns} rows={rows} />}
                </Box>
            </CardContent>
        </Card>
    );
}