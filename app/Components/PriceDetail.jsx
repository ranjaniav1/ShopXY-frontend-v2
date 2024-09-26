// src/components/PriceDetails.js
import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import CustomButton from '../Custom/CustomButton';
import { useTranslation } from 'react-i18next';

const PriceDetails = ({ numberOfItems, totalProductPrice, totalDiscount, orderTotal }) => {
    const { t } = useTranslation()
    const formatPrice = (price) => {
        return Number(price).toFixed(2)
    }
    const finalPrice = () => {
        // Ensure both totalProductPrice and totalDiscount are treated as numbers
        return Number(totalProductPrice) - Number(totalDiscount);
    };
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {t(" Price Details")} ({numberOfItems} Items)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary" sx={{ borderBottom: '1px dotted grey' }}>
                        {t("Total Product Price")}:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                        + ₹{formatPrice(totalProductPrice)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: "#22aa99" }}>
                    <Typography variant="body2" sx={{ borderBottom: '1px dotted #22aa99' }}>
                        {t("Total Discount")}:
                    </Typography>
                    <Typography variant="body2" >
                        -  ₹{totalDiscount}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bolder', color: 'black' }}>
                    <Typography >
                        {t("Order Total")}:
                    </Typography>
                    <Typography >
                        ₹{formatPrice(finalPrice())}
                    </Typography>
                </Box>
                {totalDiscount > 0 && (
                    <CustomButton title={` Yay! You saved ₹${totalDiscount} on your order!`} />
                )}
            </Box>

        </Box >
    );
};

export default PriceDetails;
