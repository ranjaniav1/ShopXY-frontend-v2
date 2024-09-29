import React from 'react';
import { Box, Card, Typography, Avatar } from '@mui/material';

const BrandReviewDrawer = ({ brand, reviews, analytics }) => {

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
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Rating Breakdown
                </Typography>
                {Object.keys(starCounts).map((star) => (
                    <Box key={star} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        <Typography sx={{ minWidth: '60px', color: starColors[star] || '#000' }}>
                            {star} ⭐
                        </Typography>
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
                        <Typography sx={{ marginLeft: 1 }}>
                            {starCounts[star]} Review{starCounts[star] !== 1 ? 's' : ''}
                        </Typography>
                    </Box>
                ))}
            </Card>

            {/* Detailed Reviews */}
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card key={review._id} sx={{ padding: 2, marginBottom: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Avatar src={review.userAvatar} alt={review.userName} />
                            <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
                                {review.userName}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#ff9800' }}>
                                {review.rating} ⭐
                            </Typography>
                            <Typography variant="body2" sx={{ marginLeft: 2 }}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            {review.review}
                        </Typography>
                    </Card>
                ))
            ) : (
                <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                    No reviews available.
                </Typography>
            )}
        </Box>
    );
};

export default BrandReviewDrawer;
