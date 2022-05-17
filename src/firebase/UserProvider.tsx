import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { CircularProgress, Box } from '@mui/material';

export const UserContext = createContext<User | null>(null);

interface UserProviderProps {
    children?: React.ReactNode;
}

export const UserProvider: React.FunctionComponent<UserProviderProps> = ({
    children
}: UserProviderProps): JSX.Element => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if (pathname !== '/auth/resetpassword' && pathname !== '/auth/register') {
            const unsubscribe = onAuthStateChanged(auth, (userState) => {
                setLoaded(false);
                if (userState) {
                    setUser(userState);
                    navigate('/dashboard');
                } else {
                    setUser(null);
                    navigate('/auth/login');
                }
                setLoaded(true);
            });
            return unsubscribe;
        } else {
            setLoaded(true);
        }
    }, [pathname]);
    return loaded ? (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100vw">
            <CircularProgress />
        </Box>
    );
};
