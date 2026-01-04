import { LinearProgress } from "@mui/material";

export default function ToolbarLoadingIndicator({ }) {
    return (
        <LinearProgress
            sx={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                bottom: 0,
                left: 0
            }}
        />
    );
}