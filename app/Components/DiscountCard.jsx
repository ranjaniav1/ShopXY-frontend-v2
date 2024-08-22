import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

const DiscountCard = ({ image, alt, title, key }) => {
    const theme = useTheme()
    return (
        <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
            <Box
                sx={{
                    position: 'relative',
                    border: `1px solid ${theme.palette.card.border}`,
                    background: `1px solid ${theme.palette.card.background}`, // Border color from theme
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: theme.shadows[2],
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: theme.shadows[4], // Darker shadow on hover
                        borderColor: theme.palette.card.hover, // Change border color on hover
                    },
                }}
            >
                <img
                    src={image}
                    alt={alt}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
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
                    }}
                >
                    Sale
                </Box>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{
                        textAlign: 'center',
                        padding: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Grid>
    )
}

export default DiscountCard
