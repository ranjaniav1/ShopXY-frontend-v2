import React from "react";
import { Box, Divider, useTheme } from "@mui/material";
import CustomButton from "../Custom/CustomButton";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";

const PriceDetails = ({
  numberOfItems,
  totalProductPrice,
  totalDiscount,
  orderTotal
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatPrice = (price) => Number(price).toFixed(2);
  const finalPrice = () => Number(totalProductPrice) - Number(totalDiscount);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.card.background,
        border: `1px solid ${theme.palette.card.border}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0px 4px 10px rgba(0,0,0,0.05)"
            : "0px 4px 15px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease-in-out"
      }}
    >
      <CustomTypography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: theme.palette.card.text
        }}
      >
        {t("Price Details")} ({numberOfItems} {t("Items")})
      </CustomTypography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Total Product Price */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTypography
            variant="body2"
            sx={{
              borderBottom: `1px dotted ${theme.palette.divider}`,
              color: theme.palette.text.secondary
            }}
          >
            {t("Total Product Price")}:
          </CustomTypography>
          <CustomTypography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.secondary
            }}
          >
            + ₹{formatPrice(totalProductPrice)}
          </CustomTypography>
        </Box>

        {/* Total Discount */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <CustomTypography
            variant="body2"
            sx={{
              color: theme.palette.success.main,
              borderBottom: `1px dotted ${theme.palette.success.main}`
            }}
          >
            {t("Total Discount")}:
          </CustomTypography>
          <CustomTypography
            variant="body2"
            sx={{ color: theme.palette.success.main }}
          >
            - ₹{totalDiscount}
          </CustomTypography>
        </Box>

        <Divider sx={{ borderColor: theme.palette.divider }} />

        {/* Order Total */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bolder",
            color: theme.palette.text.primary
          }}
        >
          <CustomTypography sx={{color:theme.palette.success.main}}>{t("Order Total")}:</CustomTypography>
          <CustomTypography sx={{color:theme.palette.success.main}}>₹{formatPrice(finalPrice())}</CustomTypography>
        </Box>

        {/* Saved Message */}
        {totalDiscount > 0 && (
          <CustomTypography
            variant="body2"
            sx={{
              mt: 3,
              py: 1.5,
              px: 2,
              borderRadius: 2,
              textAlign: "center",
              fontWeight: "bold",
              background: theme.palette.mode === "dark"
                ? "linear-gradient(90deg, #0d7377 0%, #1e9b82 100%)"
                : theme.palette.success.light,
              color: theme.palette.mode === "dark"
                ? "#ffffff"
                : theme.palette.success.main
            }}
          >
            🎉 {t("Yay! You saved")} ₹{totalDiscount} {t("on your order")}!
          </CustomTypography>
        )}
      </Box>
    </Box>
  );
};

export default PriceDetails;
