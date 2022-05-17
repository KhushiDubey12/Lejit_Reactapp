import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PasswordField } from './PasswordField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { changePassword, signout } from '../firebase/Authentication';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { CommonDialog } from './CommonDialog';
import { auth } from '../firebase/firebaseConfig';
import { reauthenticateWithCredential, EmailAuthProvider } from '@firebase/auth';

interface DialogProps {
    isDialogOpen: boolean;
    setDialog: (value: boolean) => void;
}

export const ChangePasswordDialog: React.FC<DialogProps> = ({
    isDialogOpen,
    setDialog
}): React.ReactElement => {
    const theme = useTheme();
    const { t } = useTranslation();

    const [errorState, setError] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClose = (): void => {
        setDialog(false);
    };

    const onClose = (): void => {
        setOpen(false);
        signout();
    };
    const validationSchema = Yup.object({
        password: Yup.string().required(t('noPasswordProvided')).min(8, t('passwordShort')),
        confirmPassword: Yup.string().required(t('noPasswordProvided')).min(8, t('passwordShort'))
    });
    const changePasswordForm = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const user = auth.currentUser;
            if (user !== null) {
                const userEmail = user.email;
                if (userEmail !== null) {
                    const credentials = EmailAuthProvider.credential(userEmail, values.password);
                    try {
                        const res = await reauthenticateWithCredential(user, credentials);
                        setError(t('sameAsOldPassword'));
                    } catch {
                        if (values.password === values.confirmPassword) {
                            const b = changePassword(values.password);
                            handleClose();
                            setOpen(true);
                        } else {
                            setError(t('passwordsDontMatch'));
                        }
                    }
                }
            }
        }
    });
    return (
        <div>
            <Dialog open={isDialogOpen}>
                <Box sx={{ padding: '20px 24px 24px 20px', width: 408, height: 450 }}>
                    <div
                        style={{
                            color: 'info.dark',
                            fontSize: '22px',
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            width: 360,
                            height: 32,
                            textAlign: 'center'
                        }}>
                        {t('changePasswordTitle')}
                    </div>
                    <div
                        style={{
                            color: 'info.light',
                            fontSize: '14px',
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            width: 360,
                            height: 48,
                            marginTop: 6,
                            textAlign: 'center',
                            lineHeight: '24px'
                        }}>
                        {t('changePasswordSubTitle')}
                    </div>
                    <div
                        style={{
                            color: 'info.light',
                            fontSize: '12px',
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            width: 96,
                            height: 16,
                            marginTop: 6,
                            lineHeight: '24px',
                            whiteSpace: 'nowrap'
                        }}>
                        {t('requiredFieldText')}
                    </div>
                    <form onSubmit={changePasswordForm.handleSubmit}>
                        <div style={{ marginTop: 10 }}>
                            <PasswordField
                                id="password"
                                label={t('newPasswordLabelText')}
                                onChange={changePasswordForm.handleChange}
                                value={changePasswordForm.values.password}
                                error={
                                    changePasswordForm.touched.password &&
                                    Boolean(changePasswordForm.errors.password ?? errorState)
                                }
                                helperText={changePasswordForm.errors.password ?? errorState}
                            />
                        </div>
                        <div style={{ width: 360, height: 48, marginTop: 8 }}>
                            <PasswordField
                                id="confirmPassword"
                                label={t('confirmNewPassword')}
                                onChange={changePasswordForm.handleChange}
                                value={changePasswordForm.values.confirmPassword}
                                error={
                                    changePasswordForm.touched.confirmPassword &&
                                    Boolean(changePasswordForm.errors.confirmPassword)
                                }
                                helperText={changePasswordForm.errors.confirmPassword}
                            />
                            <div style={{ fontSize: 14, color: 'red', marginLeft: 1 }}>
                                {errorState}
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '100%',
                                padding: '12px',
                                textTransform: 'none',
                                borderColor: 'secondary',
                                background: 'secondary',
                                marginTop: 5,
                                marginLeft: 1
                            }}>
                            <Typography fontWeight="bold" color="white">
                                {t('changePasswordButton')}
                            </Typography>
                        </Button>
                    </form>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            textTransform: 'none',
                            color: 'secondary',
                            borderColor: 'secondary',
                            background: 'white',
                            marginTop: 2,
                            marginLeft: 1
                        }}>
                        <Typography fontWeight="bold" color="secondary.dark">
                            {t('cancelText')}
                        </Typography>
                    </Button>
                </Box>
            </Dialog>
            <CommonDialog
                title={t('successPasswordDialogTitle')}
                detail={t('successPasswordDialogContent')}
                buttonText={t('successPasswordDialogButtonText')}
                icon={
                    <CheckCircleOutlineOutlinedIcon
                        sx={{
                            color: theme.palette.success.main,
                            height: '65px',
                            width: '65px',
                            position: 'relative',
                            left: '171.5px'
                        }}
                    />
                }
                variantType="contained"
                background="secondary.dark"
                color="white"
                handleClose={onClose}
                isDialogOpen={open}
            />
        </div>
    );
};
