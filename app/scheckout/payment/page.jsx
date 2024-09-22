import PaypalButton from '@/app/Common/PaypalButton';
import CustomButton from '@/app/Custom/CustomButton';
import CustomTypography from '@/app/Custom/CustomTypography';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Page = ({ handleBack }) => {
    return (
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                {/* Payment Method Section */}
                <CustomTypography variant="h5" gutterBottom>
                    Select Payment Method
                </CustomTypography>
                <PaypalButton sx={{ width: '100%', mb: 2 }} />
                <CustomButton title="Cash On Delivery" sx={{ width: '100%', mt: 1 }} />

                {/* Promo Code Section */}
                <Box sx={{ width: '100%', mt: 4 }}>
                    <Typography variant="h6">Apply Promo Code</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <TextField
                            label="Promo Code"
                            variant="outlined"
                            fullWidth
                            sx={{ mr: 2 }}
                        />
                        <Button variant="contained" color="primary">
                            Apply
                        </Button>
                    </Box>
                </Box>

                {/* Navigation Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        mt: 5,
                    }}
                >
                    <Link href="/scheckout/carts">
                        <CustomButton title="Back" onClick={handleBack} variant="outlined" sx={{ flex: 1 }} />
                    </Link>
                    
                </Box>
            </Box>
    );
};

export default Page;
