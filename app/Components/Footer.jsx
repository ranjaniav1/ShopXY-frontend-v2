import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation'; // For navigation if needed

const categories = [
    "Toys", "Electronics", "Men's", "Women's", "Bags and Footwear", "Pets", "Home and Kitchen"
];

const electronicsSubCategories = [
    "Mobile", "Laptop", "TV", "Headphones", "Smartwatches"
];

const Footer = () => {
    const router = useRouter();

    return (
        <Box
            sx={{
                backgroundColor: '#f8f9fa',
                py: 4,
                borderTop: '1px solid #dee2e6'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Categories Section */}
                    <Grid item xs={12} sm={4} md={2}>
                        <Typography variant="h6" gutterBottom>
                            Categories
                        </Typography>
                        <Box>
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/categories/${category.toLowerCase()}`}
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ display: 'block', mb: 1 }}
                                >
                                    {category}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Electronics Subcategories Section */}
                    <Grid item xs={12} sm={4} md={2}>
                        <Typography variant="h6" gutterBottom>
                            Electronics
                        </Typography>
                        <Box>
                            {electronicsSubCategories.map((subCategory) => (
                                <Link
                                    key={subCategory}
                                    href={`/electronics/${subCategory.toLowerCase()}`}
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ display: 'block', mb: 1 }}
                                >
                                    {subCategory}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* About Section */}
                    <Grid item xs={12} sm={4} md={2}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Link href="/about" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Our Story
                        </Link>
                        <Link href="/careers" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Careers
                        </Link>
                        <Link href="/contact" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Contact
                        </Link>
                    </Grid>

                    {/* Follow Us Section */}
                    <Grid item xs={12} sm={4} md={2}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://facebook.com" target="_blank" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Facebook
                        </Link>
                        <Link href="https://twitter.com" target="_blank" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Twitter
                        </Link>
                        <Link href="https://instagram.com" target="_blank" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Instagram
                        </Link>
                    </Grid>

                    {/* Legal Section */}
                    <Grid item xs={12} sm={4} md={2}>
                        <Typography variant="h6" gutterBottom>
                            Legal
                        </Typography>
                        <Link href="/privacy-policy" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" variant="body2" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                            Terms of Service
                        </Link>
                    </Grid>
                </Grid>
            </Container>
            <Box
                sx={{
                    textAlign: 'center',
                    py: 2,
                    backgroundColor: '#e9ecef',
                    mt: 4
                }}
            >
                <Typography variant="body2" color="textSecondary">
                    &copy; {new Date().getFullYear()} Shopxy. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
