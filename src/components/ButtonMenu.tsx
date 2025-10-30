import { useState } from "react";
import { Box } from "@mui/material";
import Menu from "./menu/Menu";
import type { MenuItemProps } from "./menu/MenuItem";

type IconButtonMenuProps = {
    items: MenuItemProps[];
    children: React.ReactNode;
};

export default function ButtonMenu({ items, children }: IconButtonMenuProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const onItemClick = () => {
        closeMenu();
    }

    return (
        <>
            <Box onClick={(e) => toggleMenu(e)}>
                {children}
            </Box>
            <Menu anchorEl={anchorEl} items={items} open={open} onItemClick={onItemClick} onClose={() => closeMenu()}></Menu>
        </>
    );
}