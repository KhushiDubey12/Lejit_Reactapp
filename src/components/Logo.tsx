import { Box, SxProps } from '@mui/material';
import React from 'react';
import AppLogo from '../assets/logo.svg';

// ----------------------------------------------------------------------

interface LogoProps {
    sx?: SxProps;
}

export function Logo({ sx }: LogoProps): React.ReactElement {
    return <Box component="img" src={AppLogo} sx={{ width: 40, height: 40, ...sx }} />;
}
