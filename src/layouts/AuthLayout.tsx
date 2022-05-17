import { Link as RouterLink, Outlet } from 'react-router-dom';
import React from 'react';
import Image from '../assets/Image.png';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function AuthLayout(): JSX.Element {
    return (
        <Grid
            lg={12}
            item
            container
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
            <Grid xl={4.3} lg={5} item md={6}>
                <RouterLink to="/auth" />
                <Outlet />
            </Grid>
            <Grid xl={7.7} lg={7} item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                <img style={{ width: '100%', height: '100%' }} src={Image} />
            </Grid>
        </Grid>
    );
}
