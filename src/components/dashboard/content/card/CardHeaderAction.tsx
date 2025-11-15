import { IconButton, Tooltip } from "@mui/material";
import type { ElementType } from "react";

export type CardHeaderActionProps = {
    icon: ElementType,
    label: string;
    tooltip?: string,
    onClick: () => void
};

export default function CardHeaderAction({ icon: Icon, label, tooltip, onClick }: CardHeaderActionProps) {
    return (
        <Tooltip title={tooltip || ""}>
            <IconButton onClick={() => onClick()} aria-label={label}>
                <Icon />
            </IconButton>
        </Tooltip>
    );
}