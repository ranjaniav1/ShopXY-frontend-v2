import React from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CustomIconButton from '../Custom/CustomIconButton';
import CustomTypography from '../Custom/CustomTypography';
import { useTranslation } from 'react-i18next';

const CartProductCard = ({
  onEdit,
  onRemove,
  image,
  name,
  offer,
  actual_price,
  discounted_price,
  quantity,
  size,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center rounded-2xl p-4 mb-4 shadow-md bg-body border hover:border-primary transition-all duration-300">
      {/* Image */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-16 h-16 object-cover rounded-lg border border-secondary"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        {/* Title and Buttons */}
        <div className="flex justify-between items-center mb-1">
          <CustomTypography variant="body1" className="font-semibold text-tprimary">
            {name}
          </CustomTypography>

          <div className="flex items-center border border-secondary rounded-xl">
            <CustomIconButton onClick={onEdit}>
              <ModeEditOutlineOutlinedIcon className="text-tprimary" />
            </CustomIconButton>

            <div className="w-px h-12 bg-secondary mx-1"></div>

            <CustomIconButton onClick={onRemove}>
              <DeleteForeverOutlinedIcon className="text-red-600" />
            </CustomIconButton>
          </div>
        </div>

        {/* Price and Offer */}
        <div className="flex items-center mb-1 space-x-2">
          <CustomTypography variant="body1" className="font-bold text-lg text-tsecondary">
            ₹{discounted_price || actual_price}
          </CustomTypography>

          {discounted_price && (
            <CustomTypography variant="body2" className="line-through text-tsecondary">
              ₹{actual_price}
            </CustomTypography>
          )}

          <CustomTypography variant="body2" className="text-tsecondary">
            {offer}% {t('off')}
          </CustomTypography>
        </div>

        {/* Size and Quantity */}
        <div className="flex items-center space-x-3">
          <CustomTypography variant="body2" className="text-tsecondary">
            {t('Size')}: {size}
          </CustomTypography>

          <div className="w-px h-7 bg-secondary"></div>

          <CustomTypography variant="body2" className="text-tsecondary">
            {t('Quantity')}: {quantity}
          </CustomTypography>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
