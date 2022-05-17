import GridViewIcon from '@mui/icons-material/GridView';
import { TFunction } from 'react-i18next';
import React from 'react';

export const sidebarConfig = (
    t: TFunction<'translation'>
): { title: string; path: string; icon: JSX.Element }[] => [
    {
        title: t('dashboard'),
        path: '/dashboard',
        icon: <GridViewIcon />
    }
];
