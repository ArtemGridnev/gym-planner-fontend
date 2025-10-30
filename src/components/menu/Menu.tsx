import { Menu as MuiMenu, type MenuProps as MuiMenuProps } from '@mui/material';
import type { MenuItemProps } from './MenuItem';
import MenuItem from './MenuItem';

type MenuProps = MuiMenuProps & {
    items: MenuItemProps[];
    onItemClick?: (item: MenuItemProps) => void;
};

export default function Menu({ items, onItemClick, ...muiProps }: MenuProps) {
    return (
        <MuiMenu {...muiProps}>
            {items.map((item, index) => (
                <MenuItem 
                    key={index}
                    {...item}
                    {...(onItemClick ? { onClick: () => {
                        item.onClick();
                        onItemClick?.(item);
                    } } : {})}
                ></MenuItem>
            ))}
        </MuiMenu>
    );
}