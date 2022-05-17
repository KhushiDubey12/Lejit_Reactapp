import React, { useState, useContext } from 'react';
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/Navbar';
import { auth } from '../../firebase/firebaseConfig';
import { UserContext } from '../../firebase/UserProvider';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));
export const DashboardLayout = (): React.ReactElement => {
    const user = useContext(UserContext);
    return (
        <RootStyle>
            <NavBar />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
};
