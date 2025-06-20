import React from 'react';
import { Box, Card, Typography, Avatar, useTheme } from '@mui/material';
import CustomTypography from '../Custom/CustomTypography';

const BrandReviewDrawer = ({ brand, reviews, analytics }) => {
const theme=useTheme()
    const starCounts = analytics?.starCounts || {};
    const totalReviews = analytics?.totalReviews || 0;

    // Define colors for different star ratings
    const starColors = {
        1: '#f44336', // Red for 1 Star
        2: '#ff9800', // Orange for 2 Stars
        3: '#ffeb3b', // Yellow for 3 Stars
        4: '#8bc34a', // Light Green for 4 Stars
        5: '#4caf50', // Green for 5 Stars
    };

    // Calculate percentage for each star
    const getPercentage = (count) => (totalReviews > 0 ? (count / totalReviews) * 100 : 0);

    return (
        <Box >
            {/* Rating Breakdown */}
            <Card sx={{ padding: 2, marginBottom: 2 }}>
                <CustomTypography variant="h6" sx={{ fontWeight: 'bold',color:theme.palette.text.primary }}>
                    Rating Breakdown
                </CustomTypography>
                {Object.keys(starCounts).map((star) => (
                    <Box key={star} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        <CustomTypography sx={{ minWidth: '60px', color: starColors[star] || '#000' }}>
                            {star} ⭐
                        </CustomTypography>
                        {/* Filled bar */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                backgroundColor: '#e0e0e0',
                                height: '10px',
                                marginLeft: 1,
                                borderRadius: '5px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    width: `${getPercentage(starCounts[star])}%`,
                                    backgroundColor: starColors[star],
                                    height: '100%',
                                }}
                            />
                        </Box>
                        {/* Number of reviews */}
                        <CustomTypography sx={{ marginLeft: 1 }}>
                            {starCounts[star]} Review{starCounts[star] !== 1 ? 's' : ''}
                        </CustomTypography>
                          {/* Percentage display */}
                          <CustomTypography sx={{ marginLeft: 1, color: '#555' }}>
                            {getPercentage(starCounts[star]).toFixed(2)}%
                        </CustomTypography>
                    </Box>
                ))}
            </Card>

            {/* Detailed Reviews */}
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card key={review._id} sx={{ padding: 2, marginBottom: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Avatar src={review.userAvatar} alt={review.userName} />
                            <CustomTypography variant="h6" sx={{ marginLeft: 2, fontWeight: 'bold' ,color:theme.palette.text.primary}}>
                                {review.userName}
                            </CustomTypography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomTypography variant="body2" sx={{ color: '#ff9800' }}>
                                {review.rating} ⭐
                            </CustomTypography>
                            <CustomTypography variant="body2" sx={{ marginLeft: 2 ,color:theme.palette.text.primary}}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </CustomTypography>
                        </Box>
                        <CustomTypography variant="body2" sx={{ marginTop: 1 ,color:theme.palette.text.primary}}>
                            {review.review}
                        </CustomTypography>
                    </Card>
                ))
            ) : (
                <CustomTypography variant="body2" sx={{ textAlign: 'center', marginTop: 2 ,color:theme.palette.text.secondary}}>
                    No reviews available.
                </CustomTypography>
            )}
        </Box>
    );
};

export default BrandReviewDrawer;
