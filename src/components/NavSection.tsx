import React, { useState } from 'react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import {
    Box,
    List,
    ListItemText,
    ListItemIcon,
    useTheme,
    styled,
    ListItemButton
} from '@mui/material';

// ----------------------------------------------------------------------

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

// ----------------------------------------------------------------------

interface NavItemProps {
    item: { title: string; path: string; icon: JSX.Element };
    active: Function;
}

function NavItem({ item, active }: NavItemProps): JSX.Element {
    const theme = useTheme();
    const isActiveRoot = active(item.path);
    const { title, path, icon } = item;
    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = (): void => {
        setOpen((prev: boolean) => !prev);
    };

    const activeRootStyle = {
        color: '#1E2933',
        fontWeight: 'fontWeightMedium',
        '&:before': { display: 'block' }
    };

    const inactiveRootStyle = {
        color: '#E3E6E8',
        fontWeight: 'fontWeightMedium',
        '&:before': { display: 'block' }
    };

    return (
        <ListItemButton
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot ? activeRootStyle : inactiveRootStyle)
            }}>
            <ListItemIconStyle
                sx={{
                    ...(isActiveRoot ? activeRootStyle : inactiveRootStyle)
                }}>
                {icon}
            </ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
        </ListItemButton>
    );
}

interface NavSectionProps {
    navConfig: { title: string; path: string; icon: JSX.Element }[];
}

export function NavSection({ navConfig }: NavSectionProps): JSX.Element {
    const { pathname } = useLocation();
    const match = (path: string): boolean => (path ? !!matchPath(path, pathname) : false);

    return (
        <Box>
            <List disablePadding>
                {navConfig.map((item) => (
                    <NavItem key={item.title} item={item} active={match} />
                ))}
            </List>
        </Box>
    );
}
