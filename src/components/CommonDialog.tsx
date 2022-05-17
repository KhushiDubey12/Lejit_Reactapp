import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography, useTheme } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DialogProps {
    title: string;
    detail: string;
    buttonText: string;
    icon?: React.ReactNode;
    variantType?: 'text' | 'outlined' | 'contained' | undefined;
    background: string;
    color: string;
    isDialogOpen: boolean;
    handleClose: () => void;
}

export const CommonDialog: React.FC<DialogProps> = ({
    title,
    detail,
    buttonText,
    icon,
    variantType,
    background,
    color,
    handleClose,
    isDialogOpen
}): React.ReactElement => {
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <Dialog open={isDialogOpen}>
            <Box sx={{ padding: '20px 24px 20px 24px' }}>
                {icon}
                <Typography
                    fontSize={'22px'}
                    align="center"
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="700"
                    sx={{ color: 'info.dark' }}>
                    {title}
                </Typography>
                <Typography
                    align="center"
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize={'14px'}
                    letterSpacing={'0.3px'}
                    sx={{
                        color: 'info.light',
                        paddingTop: '6px',
                        paddingBottom: '24px',
                        maxWidth: '408px'
                    }}>
                    {detail}
                </Typography>
                <Button
                    variant={variantType}
                    onClick={handleClose}
                    sx={{
                        width: '100%',
                        padding: '12px',
                        textTransform: 'none',
                        color: theme.palette.secondary.main,
                        borderColor: theme.palette.secondary.main,
                        background: { background }
                    }}>
                    <Typography fontWeight="bold" color={color}>
                        {buttonText}
                    </Typography>
                </Button>
            </Box>
        </Dialog>
    );
};
