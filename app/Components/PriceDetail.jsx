// src/components/PriceDetails.js
import React from "react";
import { Typography, Box, Divider, useTheme } from "@mui/material";
import CustomButton from "../Custom/CustomButton";
import { useTranslation } from "react-i18next";

const PriceDetails = ({
  numberOfItems,
  totalProductPrice,
  totalDiscount,
  orderTotal
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
  const finalPrice = () => {
    // Ensure both totalProductPrice and totalDiscount are treated as numbers
    return Number(totalProductPrice) - Number(totalDiscount);
  };
  return (
    <Box sx={{ padding: 2 }}>
      <CustomTypography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        {t(" Price Details")} ({numberOfItems} Items)
      </CustomTypography

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTypography
            variant="body2"
            color="textSecondary"
            sx={{ borderBottom: "1px dotted grey" }}
          >
            {t("Total Product Price")}:
          </CustomTypography
          <CustomTypography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: "bold" }}
          >
            + ₹{formatPrice(totalProductPrice)}
          </CustomTypography
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#22aa99"
          }}
        >
          <CustomTypography
            variant="body2"
            sx={{ borderBottom: "1px dotted #22aa99" }}
          >
            {t("Total Discount")}:
          </CustomTypography
          <CustomTypography variant="body2">- ₹{totalDiscount}</CustomTypography
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bolder",
            color: theme.palette.text.primary
          }}
        >
          <CustomTypography>{t("Order Total")}:</CustomTypography
          <CustomTypography>₹{formatPrice(finalPrice())}</CustomTypography
        </Box>
        {totalDiscount > 0 && (
          <CustomTypography
            variant="body2"
            sx={{
              mt: 2,
              color: theme.palette.success.main,
              background:theme.palette.card.background,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            🎉 Yay! You saved ₹{totalDiscount} on your order!
          </CustomTypography
        )}
      </Box>
    </Box>
  );
};

export default PriceDetails;
