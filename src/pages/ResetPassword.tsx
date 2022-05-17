import React from 'react';
import { Button, TextField, styled } from '@mui/material';
import Lejit from '../assets/Lejit.png';
import { resetPassword } from '../firebase/Authentication';
import { useTranslation } from 'react-i18next';
import { CommonDialog } from '../components/CommonDialog';
import { AuthError } from '@firebase/auth';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const ResetPasswordButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '100%',
    background: theme.palette.secondary.main,
    color: 'white',
    border: 'none',
    borderRadius: 4,
    fontSize: 16,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 700,
    letterSpacing: 0.5,
    textAlign: 'center'
}));
export function ResetPassword(): React.ReactElement {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [isError, setError] = React.useState('');
    const handleOpen = (): void => {
        setOpen(true);
    };
    const onClose = (): void => {
        setOpen(false);
        navigate('/auth/login');
    };
    const validationSchema = Yup.object({
        email: Yup.string().email(t('invalidEmailText')).required(t('requiredText'))
    });
    const ResetForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const userCredential = await resetPassword(values.email);
                handleOpen();
            } catch (authError) {
                const error = authError as AuthError;
                setError(t('emailNotRegisteredError'));
                console.error(error);
            }
        }
    });
    return (
        <>
            <div>
                <div style={{ width: 64, height: 34, marginLeft: 84, marginTop: 83 }}>
                    <img style={{ width: '100%', height: '100%' }} src={Lejit} />
                </div>
                <div
                    style={{
                        marginLeft: 84,
                        marginTop: 43.4,
                        width: 115,
                        height: 64,
                        position: 'relative',
                        whiteSpace: 'nowrap'
                    }}>
                    <h4
                        style={{
                            fontSize: 29,
                            fontWeight: 700,
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            letterSpacing: 0.25
                        }}>
                        {t('resetPasswordPageTitle')}
                    </h4>
                </div>
                <div
                    style={{
                        marginLeft: 84,
                        width: 177,
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        order: 1,
                        color: 'info.light',
                        position: 'relative',
                        whiteSpace: 'nowrap'
                    }}>
                    {t('resetPasswordPageSubTitle')}
                </div>
            </div>
            <form onSubmit={ResetForm.handleSubmit}>
                <div style={{ width: 360, height: 48, marginLeft: 84, marginTop: 40 }}>
                    <TextField
                        fullWidth
                        id="email"
                        label={t('emailTextFieldLabel')}
                        onChange={ResetForm.handleChange}
                        value={ResetForm.values.email}
                        error={
                            ResetForm.touched.email && Boolean(ResetForm.errors.email ?? isError)
                        }
                        helperText={ResetForm.touched.email && (ResetForm.errors.email ?? isError)}
                    />
                </div>
                <div style={{ width: 360, height: 48, marginLeft: 84, marginTop: 52 }}>
                    <ResetPasswordButton type="submit">
                        {t('resetPasswordButtonTitle')}
                    </ResetPasswordButton>
                    <CommonDialog
                        title={t('resetDialogTitle')}
                        detail={t('resetDialogContent')}
                        buttonText={t('resetDialogButtonText')}
                        variantType="outlined"
                        background="white"
                        color="secondary"
                        handleClose={onClose}
                        isDialogOpen={open}
                    />
                </div>
            </form>
        </>
    );
}
