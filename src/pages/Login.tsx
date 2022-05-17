import React, { useContext, useState } from 'react';
import { TextField, useTheme, Button } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import Lejit from '../assets/Lejit.png';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { login } from '../firebase/Authentication';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthError, onAuthStateChanged } from '@firebase/auth';
import { useTranslation } from 'react-i18next';
import { CommonDialog } from '../components/CommonDialog';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export function Login(): React.ReactElement {
    const theme = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [isError, setError] = React.useState('');
    const handleOpen = (): void => {
        setOpenErrorDialog(true);
    };
    const onClose = (): void => {
        setOpenErrorDialog(false);
    };

    const validationSchema = Yup.object({
        email: Yup.string().email(t('invalidEmailText')).required(t('requiredText')),
        password: Yup.string().required(t('noPasswordProvided')).min(8, t('passwordShort'))
    });
    const SignInForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const userCredential = await login(values.email, values.password);
            } catch (authError) {
                const error = authError as AuthError;
                if (error.code === 'auth/wrong-password') {
                    handleOpen();
                } else if (error.code === 'auth/user-not-found') {
                    setError(t('emailNotRegisteredError'));
                }
                SignInForm.values.email = '';
                SignInForm.values.password = '';
                console.error(error.code);
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
                        position: 'static'
                    }}>
                    <h4
                        style={{
                            fontSize: 34,
                            fontWeight: 700,
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            letterSpacing: 0.25
                        }}>
                        {t('signinPageTitle')}
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
                        position: 'static',
                        whiteSpace: 'nowrap'
                    }}>
                    {t('signinPageSubTitle')}
                </div>
            </div>
            <form onSubmit={SignInForm.handleSubmit}>
                <div style={{ width: 360, height: 48, marginLeft: 84, marginTop: 40 }}>
                    <TextField
                        fullWidth
                        id="email"
                        label={t('emailTextFieldLabel')}
                        onChange={SignInForm.handleChange}
                        value={SignInForm.values.email}
                        error={
                            SignInForm.touched.email && Boolean(SignInForm.errors.email ?? isError)
                        }
                        helperText={
                            SignInForm.touched.email && (SignInForm.errors.email ?? isError)
                        }
                    />
                </div>
                <div style={{ width: 360, height: 48, marginTop: 20, marginLeft: 75 }}>
                    <PasswordField
                        id="password"
                        label={t('passwordTextFieldLabel')}
                        onChange={SignInForm.handleChange}
                        value={SignInForm.values.password}
                        error={SignInForm.touched.password && Boolean(SignInForm.errors.password)}
                        helperText={SignInForm.errors.password}
                    />
                </div>
                <div style={{ width: 131, height: 20, marginLeft: 324, marginTop: 26 }}>
                    <Link to="/auth/resetpassword">
                        <button
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                border: 'none',
                                background: 'none',
                                color: theme.palette.primary.main,
                                whiteSpace: 'nowrap'
                            }}>
                            {t('forgotPasswordButtonTitle')}
                        </button>
                    </Link>
                </div>
                <div
                    style={{
                        width: 360,
                        height: 48,
                        marginLeft: 84,
                        marginTop: 40,
                        whiteSpace: 'nowrap'
                    }}>
                    <Button
                        type="submit"
                        style={{
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
                        }}>
                        {t('signinButtonTitle')}
                    </Button>
                </div>
            </form>
            <div
                style={{
                    width: 231,
                    height: 24,
                    marginLeft: 151.7,
                    marginTop: 28,
                    fontSize: 14,
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                }}>
                <p style={{ color: 'info.light' }}>
                    {t('paraTitle')}
                    <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'primary' }}>{t('signUpButtonTitle')}</span>
                    </Link>
                </p>
                <CommonDialog
                    title={t('invalidDialogTitle')}
                    detail={t('invalidDialogContent')}
                    buttonText={t('invalidDialogButtonText')}
                    icon={
                        <ErrorOutlineOutlinedIcon
                            sx={{
                                color: theme.palette.error.main,
                                height: '65px',
                                width: '65px',
                                position: 'relative',
                                left: '171.5px'
                            }}
                        />
                    }
                    variantType="outlined"
                    background="white"
                    color="secondary.main"
                    handleClose={onClose}
                    isDialogOpen={openErrorDialog}
                />
            </div>
        </>
    );
}
