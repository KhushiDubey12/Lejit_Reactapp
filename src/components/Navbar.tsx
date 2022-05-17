import { AppBar, Box, CssBaseline, Toolbar, Tabs, Tab, ThemeProvider } from '@mui/material';
import { DropdownTranslation } from './DropdownTranslation';
import { Profile } from './Profile';
import Lejit from '../assets/Lejit.png';
import React from 'react';
import { ChangePassword } from './ChangePassword';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return <div>{value === index && <div>{children}</div>}</div>;
};
export const NavBar = (): React.ReactElement => {
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation();
    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: '#FFFFFF',
                    height: '100px',
                    boxShadow: '0px -1px 0px #E3E4EB inset',
                    width: '1532px'
                }}>
                <CssBaseline />
                <Toolbar>
                    <Box sx={{ flexGrow: 1, borderColor: 'divider', display: 'flex' }}>
                        <img
                            src={Lejit}
                            height="33.6px"
                            width="64px"
                            alt="Lejit"
                            style={{ marginLeft: 80, marginTop: 44, marginBottom: 24.4 }}
                        />
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            style={{
                                marginLeft: 400,
                                marginBottom: 38,
                                marginTop: 38,
                                display: 'flex',
                                width: '100%'
                            }}>
                            <Tab
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Inter',
                                    fontWeight: 700
                                }}
                                label={t('navbarDashButton')}
                            />
                            <Tab
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Inter',
                                    fontWeight: 700
                                }}
                                label={t('navbarUserButton')}
                            />
                            <Tab
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Inter',
                                    fontWeight: 700
                                }}
                                label={t('navbarProfileButton')}
                            />
                        </Tabs>
                        <Profile />
                        <DropdownTranslation />
                    </Box>
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={2}>
                <ChangePassword />
            </TabPanel>
        </div>
    );
};
