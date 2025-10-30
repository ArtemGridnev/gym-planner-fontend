import { MenuItem as MenuItemMui } from "@mui/material";
import type { ElementType } from "react";

export type MenuItemProps = {
    icon?: ElementType;
    text: string;
    onClick: () => void;
};

export default function MenuItem({ icon: Icon, text, onClick }: MenuItemProps) {
    return (
        <MenuItemMui sx={{ gap: '0.5rem' }} onClick={() => onClick()}>
            {Icon && <Icon sx={{ color: 'text.secondary' }} />}
            {text}
        </MenuItemMui>
    );
}