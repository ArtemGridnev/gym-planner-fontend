import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";

export type SidebarNavItemProps = {
    path?: string;
    text: string;
    icon: ElementType;
    children?: SidebarNavItemProps[];
};

export default function SidebarNavItem({ path, text, icon: Icon, children}: SidebarNavItemProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItem key={text} disablePadding>
                <ListItemButton 
                    onClick={
                        () => {
                            if (path) navigate(path);
                            if (children) setOpen(!open);
                        }
                    } 
                >
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {children && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>
            {children && (
                <Collapse in={open} sx={{ paddingInlineStart: '1.25rem' }}>
                    {children.map((child, index) => (
                        <SidebarNavItem {...child} key={index}></SidebarNavItem>
                    ))}
                </Collapse>
            )}
        </>
    );
}