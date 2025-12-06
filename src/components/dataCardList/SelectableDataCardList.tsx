import { useEffect, useState } from "react";
import type { DataCardListProps, DataCardListRowProps } from "./DataCardList";
import DataCardListItem from "./DataCardListItem";
import { Box, Checkbox, Typography } from "@mui/material";

export type SelectableDataCardListRowProps = DataCardListRowProps & {
    id: string
};

type SelectableDataCardListProps = Omit<DataCardListProps, 'rows'> & {
    rows: SelectableDataCardListRowProps[];
    onChange: (rows: string[]) => void;
};

export default function SelectableDataCardList({ columns, rows, onChange, noDataMessage = "No items here… yet." }: SelectableDataCardListProps) {
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        onChange(selected);
    }, [selected]);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column'
            }}
        >
            {rows.length === 0 && <Typography variant="h6" sx={{ textAlign: 'center'}}>{noDataMessage}</Typography>}
            {rows.map((row) => (
                <Box 
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                    }}
                    key={row.id}
                >
                    <Checkbox 
                        value={row.id} 
                        onChange={(e) => {
                            setSelected(prev => {
                                if (e.target.checked) {
                                    return [...prev, row.id];
                                } else {
                                    return prev.filter(item => item !== row.id);
                                }
                            })
                        }} 
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <DataCardListItem columns={columns} row={row} />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}