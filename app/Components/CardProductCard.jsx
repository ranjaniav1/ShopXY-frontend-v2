import React from 'react';
import { Edit, Trash2 } from "lucide-react";
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
    <div className="relative flex items-center rounded-md p-4 shadow-md bg-body mb-1 border hover:border-primary transition-all duration-300">
      {/* Image */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-16 h-16 object-cover rounded-md border border-secondary"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        {/* Title and Action Icons */}
        <div className="flex justify-between items-start">
          <CustomTypography variant="body1" className="font-semibold text-tprimary">
            {name}
          </CustomTypography>
        </div>

        {/* Price and Offer */}
        <div className="flex items-center mb-1 space-x-2">
          <CustomTypography variant="body1" className="font-bold text-lg text-tactive">
            ₹{discounted_price}
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
            {t('Quantity')}: {quantity}
          </CustomTypography>
        </div>
      </div>

      {/* Action Icons (Edit + Delete) */}
      <div className="absolute top-3 right-3 flex items-center bg-body border border-secondary rounded-md px-1.5 py-0.5 shadow-sm z-10">
        <CustomIconButton onClick={onEdit} className="text-tactive ">
          <Edit size={18} />
        </CustomIconButton>
        <div className="w-px h-5 bg-secondary " />
        <CustomIconButton onClick={onRemove} className="">
          <Trash2 size={18} className='text-red-600' />
        </CustomIconButton>
      </div>
    </div>
  );
};

export default CartProductCard;
