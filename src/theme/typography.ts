import { TypographyOptions } from '@mui/material/styles/createTypography';

function pxToRem(value: number): string {
    return `${value / 16}rem`;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
    return {
        fontSize: pxToRem(sm),
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm)
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md)
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg)
        }
    };
}

const FONT_PRIMARY = 'Public Sans, sans-serif';

export const typography: TypographyOptions = {
    fontFamily: FONT_PRIMARY,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 30, md: 32, lg: 34 })
    },
    h2: {
        fontWeight: 700,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 22, md: 24, lg: 26 })
    },
    h3: {
        fontWeight: 700,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 })
    },
    h4: {
        fontWeight: 700,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 })
    },
    h5: {
        fontWeight: 700,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 11, md: 13, lg: 15 })
    },
    h6: {
        fontWeight: 700,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 8, md: 10, lg: 12 })
    },
    subtitle1: {
        fontWeight: 600,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 })
    },
    subtitle2: {
        fontWeight: 600,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 12, md: 14, lg: 16 })
    },
    body1: {
        fontWeight: 500,
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 })
    },
    body2: {
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 12, md: 14, lg: 16 })
    },
    caption: {
        lineHeight: 1.25,
        ...responsiveFontSizes({ sm: 10, md: 12, lg: 14 })
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.25,
        fontSize: pxToRem(12),
        letterSpacing: 1.1,
        textTransform: 'uppercase'
    },
    button: {
        fontWeight: 700,
        lineHeight: 1.25,
        fontSize: pxToRem(14),
        textTransform: 'none'
    }
};
