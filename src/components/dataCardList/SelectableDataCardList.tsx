import { useEffect, useState } from "react";
import type { DataCardListColumnProps, DataCardListRowProps } from "./DataCardList";
import DataCardListItem from "./DataCardListItem";
import { Box, Checkbox } from "@mui/material";

export type SelectableDataCardListRowProps = DataCardListRowProps & {
    id: string
};

type SelectableDataCardListProps = {
    columns: DataCardListColumnProps[];
    rows: SelectableDataCardListRowProps[];
    onChange: (rows: string[]) => void;
};

export default function SelectableDataCardList({ columns, rows, onChange }: SelectableDataCardListProps) {
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