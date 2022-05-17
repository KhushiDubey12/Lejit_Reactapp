import React, { useContext } from 'react';
import {
    Avatar,
    Box,
    Button,
    Typography,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../firebase/UserProvider';
import { useTranslation } from 'react-i18next';
import { stringAvatar } from '../utils';
import { signout } from '../firebase/Authentication';

export const Profile = (): React.ReactElement => {
    const user = useContext(UserContext);
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
        signout();
    };
    const close = (): void => {
        setAnchorEl(null);
    };
    if (!user) {
        return <> </>;
    }
    const { displayName } = user;
    return (
        <Box sx={{ marginLeft: '80px', marginTop: '26px', marginBottom: '26px', display: 'flex' }}>
            <Button disableTouchRipple={true} sx={{ textTransform: 'none' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        <Avatar
                            sx={{
                                height: '48px',
                                width: '48px',
                                bgcolor: 'primary.light',
                                color: 'primary.dark'
                            }}>
                            {stringAvatar(displayName ? displayName : '')}
                        </Avatar>
                        <Typography
                            fontWeight="bold"
                            sx={{
                                color: 'info.light',
                                paddingLeft: '12px',
                                fontSize: '14px',
                                fontFamily: 'Inter',
                                fontWeight: 700,
                                width: '93px',
                                height: '20px',
                                whiteSpace: 'nowrap'
                            }}>
                            {displayName}
                        </Typography>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClick={close}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {t('userLogoutOption')}
                    </MenuItem>
                </Menu>
            </Button>
            <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ marginLeft: '60px', background: '#8E90A6', marginRight: '20px' }}
            />
        </Box>
    );
};
