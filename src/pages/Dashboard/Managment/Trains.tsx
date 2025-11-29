import { Box, CircularProgress } from "@mui/material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import { AddOutlined, DeleteOutline, EditOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import { useEffect, useState } from "react";
import type { DataCardListColumnProps, DataCardListRowProps } from "../../../components/dataCardList/DataCardList";
import useTrains from "../../../hooks/Trains/useTrains";
import DataCardList from "../../../components/dataCardList/DataCardList";
import Modal from "../../../components/modal/Modal";
import type { Train } from "../../../types/train";
import TrainForm from "../../../components/forms/TrainFrom";
import { useNavigate } from "react-router-dom";
import Alerts from "../../../components/Alerts";

function cronToDays(cron: string): string {
    const days: Record<string, string> = {
        '0': 'Sun',
        '1': 'Mon',
        '2': 'Tue',
        '3': 'Wed',
        '4': 'Thu',
        '5': 'Fri',
        '6': 'Sat'
    };

    const parts = cron?.trim()?.split(' ');
        
    const weekDaysKeys = parts[4]?.replaceAll('*', '').split(',') || [];

    return weekDaysKeys.map((key) => days[key]).join(', ');
}

const columns: DataCardListColumnProps[] = [
    { field: 'weekDays', name: 'Recurrence Days', fullWidth: true }
];

export default function Trains() {
    const navigate = useNavigate();
    const { 
        trains, 
        loading, 
        error, 
        fetchTrains,
        addTrain,
        updateTrain,
        deleteTrain
    } = useTrains();
    const [rows, setRows] = useState<DataCardListRowProps[]>([]);
    const [trainId, setTrainId] = useState<number | null>(null);
    const [formOpen, setFormOpen] = useState(false);

    const onFormSubmit = (train: Train) => {
        setFormOpen(false); 
        
        if (trainId) {
            updateTrain(train);
        } else {
            addTrain(train);
        }
    };

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
                        onClick: () => {
                            setTrainId(train.id); 
                            setFormOpen(true);
                        }  
                    },
                    { icon: DeleteOutline, text: 'delete', onClick: () => deleteTrain(train.id) },
                ],
                onClick: () => navigate(`/managment/trains/${train.id}`)
            })));
        } else {
            setRows([]);
        }
    }, [trains]);

    useEffect(() => {
        fetchTrains();
    }, []);

    return (
        <>
            <Modal 
                open={formOpen} 
                onClose={() => setFormOpen(false)} 
                width="30rem"
            >
                <Modal.Header>{trainId ? "Update Train" : "Create Train"}</Modal.Header>
                <Modal.Content>
                    <Box sx={{ p: '0.75rem' }}>
                        <TrainForm 
                            onSuccess={onFormSubmit} 
                            trainId={trainId}
                        />
                    </Box>
                </Modal.Content>
            </Modal>

            <Card>
                <CardHeader 
                    title="Trainings"
                    actions={[
                        {
                            icon: AddOutlined,
                            label: 'Create Train',
                            tooltip: 'Create Train',
                            onClick: () => {
                                setTrainId(null);
                                setFormOpen(true);
                            }
                        }
                    ]}
                />
                <CardContent>
                    <Box sx={{ padding: '1rem' }}>
                        {loading && <CircularProgress size={25} color="inherit" sx={{ display: 'block', margin: 'auto' }} />}
                        {error && <Alerts error={error} />}
                        {trains && !loading && <DataCardList columns={columns} rows={rows} />}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}