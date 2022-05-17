import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Drawer, Hidden, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.svg';
import { sidebarConfig } from './SidebarConfig';
import { NavSection } from './NavSection';
import { Scrollbar } from './Scrollbar';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

const Logo = styled('img')({
    height: '27px'
});

// ----------------------------------------------------------------------

interface SidebarProps {
    isOpenSidebar: boolean;
    onCloseSidebar: Function;
}

export function Sidebar({ isOpenSidebar, onCloseSidebar }: SidebarProps): JSX.Element {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
    }, [pathname]);

    const renderContent: JSX.Element = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
            }}>
            <Box sx={{ px: 2.5, py: 3 }}>
                <Box component={RouterLink} to="/dashboard" sx={{ display: 'inline-flex' }}>
                    <Logo src={logo} alt="logo" />
                </Box>
            </Box>
            <NavSection navConfig={sidebarConfig(t)} />
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <RootStyle>
            <Hidden lgUp>
                <Drawer
                    open={isOpenSidebar}
                    onClose={(): void => onCloseSidebar()}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}>
                    {renderContent}
                </Drawer>
            </Hidden>
            <Hidden lgDown>
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default'
                        }
                    }}>
                    {renderContent}
                </Drawer>
            </Hidden>
        </RootStyle>
    );
}
