import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import CustomTypography from '../Custom/CustomTypography';

const DiscountCard = ({ image, alt, title }) => {
    const theme = useTheme();

    return (
        <Grid item xs={6} sm={4} md={3} lg={2} >
            <Box
                sx={{
                    position: 'relative',
                    border: `1px solid ${theme.palette.card.border}`,
                    background: theme.palette.background.main,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: theme.shadows[2],
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    height: '100%', // Ensure Box takes full height of Grid item
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: theme.shadows[4],
                        borderColor: theme.palette.card.hover,
                    },
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={image}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: theme.palette.button.background,
                        color: theme.palette.button.color,
                        padding: '4px 8px',
                        borderBottomLeftRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        zIndex: 1,
                    }}
                >
                    Sale
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '8px',
                        textAlign: 'center',
                        zIndex: 1,
                    }}
                >
                    <CustomTypography variant="body1"  sx={{color:theme.palette.text.primary}}>
                        {title}
                    </CustomTypography>
                </Box>
            </Box>
        </Grid>
    );
};

export default DiscountCard;
