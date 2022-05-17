import { Link as RouterLink, Outlet } from 'react-router-dom';
import React from 'react';
import { styled, Theme } from '@mui/material';
import { Logo } from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0)
}));

// ----------------------------------------------------------------------

export function LogoOnlyLayout(): React.ReactElement {
    return (
        <>
            <HeaderStyle>
                <RouterLink to="/">
                    <Logo />
                </RouterLink>
            </HeaderStyle>
            <Outlet />
        </>
    );
}
