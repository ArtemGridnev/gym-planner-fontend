import { Box, IconButton, Typography } from "@mui/material";
import Card from "../../../components/dashboard/content/card/Card";
import CardHeader from "../../../components/dashboard/content/card/CardHeader";
import { AddOutlined, DeleteOutline, EditOutlined } from "@mui/icons-material";
import CardContent from "../../../components/dashboard/content/card/CardContent";
import { useEffect, useState } from "react";
import { getTrainsList } from "../../../services/trainsService";
import type { Train } from "../../../types/train";
import DataCard from "../../../components/dataCardList/DataCard";
import type { MenuItemProps } from "../../../components/menu/MenuItem";

export default function Trains() {
    const [ loading, setLoading ] = useState(true);
    const [ trains, setTrains ] = useState<Train[] | null>(null);
    
    const fetchTrains = async () => {
        try {
            const data = await getTrainsList();

            setTrains(data)
        } catch (err: any) {
            console.error(err.message || "Trains fetch failed");
        }
        
        setLoading(false);
    };

    useEffect(() => {
        fetchTrains();
    }, []);

    const itemMenuItems: MenuItemProps[] = [
        {
            icon: EditOutlined,
            text: 'edit',
            onClick: () => console.log('click')
        },
        {
            icon: DeleteOutline,
            text: 'delete',
            onClick: () => console.log('click')
        }
    ];

    return (
        <Card>
            <CardHeader>
                <Typography variant="h1" sx={{ fontSize: '1.5rem' }}>Trainings</Typography>
                <IconButton sx={{ marginInlineStart: 'auto' }}>
                    <AddOutlined />
                </IconButton>
            </CardHeader>
            <CardContent>
                <Box sx={{ padding: '1rem' }}>
                    {trains && trains.map(train => (
                        <DataCard title={train.name} icon={AddOutlined} menuItems={itemMenuItems}></DataCard>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}