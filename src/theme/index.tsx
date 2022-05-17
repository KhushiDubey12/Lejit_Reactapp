import React, { useMemo } from 'react';
import { CssBaseline, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { typography } from './typography';
import { ComponentsOverrides } from './overrides';
import { GlobalStyles } from './GlobalStyles';
import { palette } from './palette';

interface ThemeProps {
    children: React.ReactElement;
}

export function ThemeConfig({ children }: ThemeProps): React.ReactElement {
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette,
            typography
        }),
        []
    );
    const theme = createTheme(themeOptions);
    theme.components = ComponentsOverrides(theme);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
