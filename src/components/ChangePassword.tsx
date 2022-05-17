import React, { useContext } from 'react';
import { Avatar, Box, Button, styled } from '@mui/material';
import { auth } from '../firebase/firebaseConfig';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../firebase/UserProvider';
import { stringAvatar } from '../utils';

const ChangePasswordButton = styled(Button)(({ theme }) => ({
    width: '308px',
    height: '48px',
    background: theme.palette.secondary.main,
    color: 'white',
    border: 'none',
    borderRadius: 4,
    fontSize: 16,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 700,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 26,
    marginLeft: 750
}));

const AvatarDisplay = styled(Avatar)(({ theme }) => ({
    height: '100px',
    width: '100px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontSize: '22px',
    fontWeight: 700,
    fontFamily: 'Inter'
}));

const BoxContainer = styled(Box)({
    marginLeft: '80px',
    marginTop: '40px',
    marginBottom: '26px',
    display: 'flex'
});
export const ChangePassword = (): React.ReactElement => {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const user = useContext(UserContext);

    const handleOpen = (): void => {
        setOpen(true);
    };
    if (!user) {
        return <> </>;
    }
    const { displayName, email } = user;
    return (
        <div>
            <BoxContainer>
                <AvatarDisplay>{stringAvatar(displayName ? displayName : '')}</AvatarDisplay>
                <div>
                    <div
                        style={{
                            color: 'black',
                            fontSize: 24,
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            width: '157px',
                            height: '40px',
                            whiteSpace: 'nowrap',
                            marginLeft: '16px',
                            marginTop: '16px',
                            lineHeight: '40px'
                        }}>
                        {displayName}
                    </div>
                    <div
                        style={{
                            color: 'info.light',
                            fontSize: 16,
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            width: '157px',
                            height: '40px',
                            whiteSpace: 'nowrap',
                            marginLeft: '16px',
                            lineHeight: '28px'
                        }}>
                        {email}
                    </div>
                </div>
                <ChangePasswordButton type="submit" onClick={handleOpen}>
                    {t('changePasswordButton')}
                </ChangePasswordButton>
            </BoxContainer>
            <ChangePasswordDialog isDialogOpen={open} setDialog={setOpen} />
        </div>
    );
};
