import React from "react";
import CustomButton from "../Custom/CustomButton";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";

const PriceDetails = ({
  numberOfItems,
  totalProductPrice,
  totalDiscount,
  orderTotal,
}) => {
  const { t } = useTranslation();

  const formatPrice = (price) => Number(price).toFixed(2);
  const finalPrice = () => Number(totalProductPrice) - Number(totalDiscount);

  return (
    <div className="p-4 rounded-2xl bg-body border border-tsecondary shadow-md transition-all duration-300">
      {/* Heading */}
      <CustomTypography
        variant="h6"
        className="mb-4 font-bold text-tprimary"
      >
        {t("Price Details")} ({numberOfItems} {t("Items")})
      </CustomTypography>

      <div className="flex flex-col gap-3">
        {/* Total Product Price */}
        <div className="flex justify-between items-center">
          <CustomTypography
            variant="body2"
            className="border-b border-dotted border-tsecondary text-tsecondary"
          >
            {t("Total Product Price")}:
          </CustomTypography>
          <CustomTypography
            variant="body2"
            className="font-bold text-tsecondary"
          >
            + ₹{formatPrice(totalProductPrice)}
          </CustomTypography>
        </div>

        {/* Total Discount */}
        <div className="flex justify-between items-center">
          <CustomTypography
            variant="body2"
            className="text-green-600 border-b border-dotted border-green-600"
          >
            {t("Total Discount")}:
          </CustomTypography>
          <CustomTypography
            variant="body2"
            className="text-green-600"
          >
            - ₹{totalDiscount}
          </CustomTypography>
        </div>

        <div className="border-t border-secondary my-2" />

        {/* Order Total */}
        <div className="flex justify-between font-bold text-tprimary">
          <CustomTypography className="text-green-600">
            {t("Order Total")}:
          </CustomTypography>
          <CustomTypography className="text-green-600">
            ₹{formatPrice(finalPrice())}
          </CustomTypography>
        </div>

        {/* Saved Message */}
        {totalDiscount > 0 && (
          <CustomTypography
            variant="body2"
            className="mt-3 py-2 px-4 text-center font-bold rounded-xl bg-green-100 text-green-600"
          >
            🎉 {t("Yay! You saved")} ₹{totalDiscount} {t("on your order")}!
          </CustomTypography>
        )}
      </div>
    </div>
  );
};

export default PriceDetails;
