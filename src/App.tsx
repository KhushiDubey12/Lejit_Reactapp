import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n/config';
import { ThemeConfig } from './theme';
import { Router as AppRouter } from './routes';
import { UserProvider } from './firebase/UserProvider';

export function App(): JSX.Element {
    const { t } = useTranslation();
    return (
        <ThemeConfig>
            <Router>
                <UserProvider>
                    <AppRouter />
                </UserProvider>
            </Router>
        </ThemeConfig>
    );
}
