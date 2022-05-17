import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';
import enFlag from '../assets/enFlag.png';
import frFlag from '../assets/frFlag.png';
import i18next from 'i18next';

const localisation = [
    {
        title: 'English',
        value: 'en',
        icon: enFlag
    },
    {
        title: 'French',
        value: 'fr',
        icon: frFlag
    }
];
export const DropdownTranslation = (): React.ReactElement => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (index: number): void => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ marginLeft: '24px', marginTop: '40px' }}>
            <Button
                disableTouchRipple={true}
                onClick={handleClickListItem}
                sx={{ backgroundColor: '#FFFFFF' }}>
                <img
                    src={localisation[selectedIndex].icon}
                    alt={localisation[selectedIndex].title}
                />
                <Typography
                    fontWeight="bold"
                    sx={{ color: 'info.light', paddingLeft: '8px', paddingRight: '18px' }}>
                    {localisation[selectedIndex].value.toUpperCase()}
                </Typography>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
            <Menu elevation={2} anchorEl={anchorEl} open={open} onClose={handleClose}>
                {localisation.map((language, index) => (
                    <MenuItem
                        key={language.value}
                        onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
                            handleMenuItemClick(index);
                            i18next.changeLanguage(localisation[index].value);
                        }}>
                        <img src={language.icon} />
                        <Typography
                            color={index === selectedIndex ? 'secondary' : undefined}
                            fontWeight="bold"
                            sx={{ paddingLeft: '12px', paddingRight: '51px' }}>
                            {language.title}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};
