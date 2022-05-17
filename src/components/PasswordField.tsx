import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useTranslation } from 'react-i18next';

interface PasswordFieldProps {
    id: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
    error?: boolean;
    helperText?: string;
}
export const PasswordField: React.FC<PasswordFieldProps> = ({
    id,
    label,
    onChange,
    value,
    error,
    helperText
}): React.ReactElement => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (): void => {
        setShowPassword(!showPassword);
    };

    const { t } = useTranslation();
    return (
        <FormControl sx={{ m: 1, width: 360 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                error={error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end">
                            {showPassword ? (
                                <VisibilityOffOutlinedIcon />
                            ) : (
                                <VisibilityOutlinedIcon />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    );
};
