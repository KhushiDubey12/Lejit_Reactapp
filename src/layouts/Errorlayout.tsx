import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

interface ErrorlayoutProps {
    title: string;
    subtitle: string;
    image: string;
}

const ErrorContainer = styled(Container)({
    textAlign: 'center',
    minHeight: '100vh',
    paddingTop: 55,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 480
});

export function Errorlayout({ title, subtitle, image }: ErrorlayoutProps): React.ReactElement {
    const { t } = useTranslation();
    return (
        <ErrorContainer>
            <Typography variant="h1" my={1}>
                {t(title)}
            </Typography>
            <Typography variant="subtitle1" my={1}>
                {t(subtitle)}
            </Typography>
            <Box
                component="img"
                src={image}
                sx={{
                    height: 260,
                    mx: 'auto',
                    my: { xs: 5, sm: 10 }
                }}
            />
            <Button to="/" size="large" variant="contained" component={RouterLink} sx={{ my: 1 }}>
                {t('goHomeButtonTitle')}
            </Button>
        </ErrorContainer>
    );
}
