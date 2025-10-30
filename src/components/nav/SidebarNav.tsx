import { List } from "@mui/material";
import type { SidebarNavItemProps } from "./SidebarNavItem";
import SidebarNavItem from "./SidebarNavItem";

type SidebarNavProps = {
    items: SidebarNavItemProps[];
}

export default function SidebarNav({ items }: SidebarNavProps) {
    return (
        <List>
            {items.map((item, index) => (
                <SidebarNavItem {...item} key={index}></SidebarNavItem>
            ))}
        </List>
    );
}