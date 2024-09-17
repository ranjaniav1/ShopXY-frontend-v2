import PaypalButton from '@/app/Common/PaypalButton'
import CustomButton from '@/app/Custom/CustomButton'
import CustomTypography from '@/app/Custom/CustomTypography'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <div>
            <Box display="block" justifyContent="space-between" alignItems="center" p={2}>
                <CustomTypography variant="h5">Select Payment Method</CustomTypography>
                <PaypalButton />
                <CustomButton title="Cash On Delivery" />
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Apply Promo Code</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        label="Promo Code"
                        // value={promoCode}
                        // onChange={handlePromoCodeChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" color="primary" >
                        Apply
                    </Button>
                </Box></Box>
        </div>
    )
}

export default page
