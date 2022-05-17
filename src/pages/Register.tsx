import { TextField, useTheme } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import Lejit from '../assets/Lejit.png';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { register } from '../firebase/Authentication';
import { Link, useNavigate } from 'react-router-dom';
import { AuthError, updateProfile, UserCredential } from '@firebase/auth';
import { CommonDialog } from '../components/CommonDialog';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { auth } from '../firebase/firebaseConfig';
import { UserContext } from '../firebase/UserProvider';
import { ThemeConfig } from '../theme';

export function Register(): React.ReactElement {
    const theme = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const user = useContext(UserContext);
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [isError, setError] = React.useState('');
    const handleOpen = (): void => {
        setOpenSuccessDialog(true);
    };
    const onClose = (): void => {
        setOpenSuccessDialog(false);
        navigate('/dashboard');
    };
    const createUser = async (values: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<UserCredential> => {
        const userCredential = await register(values.email, values.password);
        handleOpen();
        const { currentUser } = auth;
        if (currentUser !== null) {
            await updateProfile(currentUser, {
                displayName: `${values.firstName} ${values.lastName}`
            });
        }
        return userCredential;
    };
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, t('tooShort'))
            .max(50, t('tooLong'))
            .required(t('requiredText')),
        lastName: Yup.string()
            .min(2, t('tooShort'))
            .max(50, t('tooLong'))
            .required(t('requiredText')),
        email: Yup.string().email(t('invalidEmailText')).required(t('requiredText')),
        password: Yup.string().required(t('noPasswordProvided')).min(8, t('passwordShort'))
    });
    const SignUpForm = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createUser(values);
            } catch (authError) {
                const error = authError as AuthError;
                setError(t('emailAlreadyInUse'));
                console.error(error.message);
            }
        }
    });
    return (
        <>
            <div>
                <div style={{ width: 64, height: 34, marginLeft: 80, marginTop: 83 }}>
                    <img style={{ width: '100%', height: '100%' }} src={Lejit} />
                </div>
                <div
                    style={{
                        marginLeft: 80,
                        marginTop: 43.4,
                        width: 115,
                        height: 64,
                        position: 'relative',
                        whiteSpace: 'nowrap'
                    }}>
                    <h4
                        style={{
                            fontSize: 34,
                            fontWeight: 700,
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            letterSpacing: 0.25
                        }}>
                        {t('signupPageTitle')}
                    </h4>
                </div>
                <div
                    style={{
                        marginLeft: 80,
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
                    {t('signupPageSubTitle')}
                </div>
            </div>
            <form onSubmit={SignUpForm.handleSubmit}>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            marginLeft: 80,
                            marginTop: 40,
                            width: 172,
                            height: 48,
                            whiteSpace: 'nowrap'
                        }}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label={t('firstnameTextFieldLabel')}
                            type="text"
                            onChange={SignUpForm.handleChange}
                            value={SignUpForm.values.firstName}
                            error={
                                SignUpForm.touched.firstName && Boolean(SignUpForm.errors.firstName)
                            }
                            helperText={SignUpForm.touched.firstName && SignUpForm.errors.firstName}
                        />
                    </div>
                    <div style={{ marginLeft: 16, marginTop: 40, width: 172, height: 48 }}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label={t('lastnameTextFieldLabel')}
                            onChange={SignUpForm.handleChange}
                            value={SignUpForm.values.lastName}
                            error={
                                SignUpForm.touched.lastName && Boolean(SignUpForm.errors.lastName)
                            }
                            helperText={SignUpForm.touched.lastName && SignUpForm.errors.lastName}
                        />
                    </div>
                </div>
                <div style={{ width: 360, height: 48, marginLeft: 80, marginTop: 32 }}>
                    <TextField
                        fullWidth
                        id="email"
                        label={t('emailTextFieldLabel')}
                        onChange={SignUpForm.handleChange}
                        value={SignUpForm.values.email}
                        error={
                            SignUpForm.touched.email && Boolean(SignUpForm.errors.email ?? isError)
                        }
                        helperText={
                            SignUpForm.touched.email && (SignUpForm.errors.email ?? isError)
                        }
                    />
                </div>
                <div style={{ width: 360, height: 48, marginTop: 28, marginLeft: 72 }}>
                    <PasswordField
                        id="password"
                        label={t('passwordTextFieldLabel')}
                        onChange={SignUpForm.handleChange}
                        value={SignUpForm.values.password}
                        error={SignUpForm.touched.password && Boolean(SignUpForm.errors.password)}
                        helperText={SignUpForm.errors.password}
                    />
                </div>
                <div style={{ width: 360, height: 48, marginLeft: 80, marginTop: 52 }}>
                    <button
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
                        {t('signUpButtonTitle')}
                    </button>
                </div>
            </form>
            <div
                style={{
                    width: 231,
                    height: 24,
                    marginLeft: 144.5,
                    marginTop: 24,
                    fontSize: 14,
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                }}>
                <p style={{ color: 'info.light' }}>
                    {t('bottomParaTitle')}
                    <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'primary.main' }}>{t('signinButtonTitle')}</span>
                    </Link>
                </p>
                <CommonDialog
                    title={t('successDialogTitle')}
                    detail={t('successDialogContent')}
                    buttonText={t('successDialogButtonText')}
                    icon={
                        <CheckCircleOutlineOutlinedIcon
                            sx={{
                                color: 'success.main',
                                height: '65px',
                                width: '65px',
                                position: 'relative',
                                left: '171.5px'
                            }}
                        />
                    }
                    variantType="contained"
                    background="secondary.main"
                    color="white"
                    handleClose={onClose}
                    isDialogOpen={openSuccessDialog}
                />
            </div>
        </>
    );
}
