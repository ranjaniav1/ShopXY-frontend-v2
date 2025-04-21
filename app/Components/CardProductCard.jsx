import React from 'react';
import { Box, Divider, useTheme } from '@mui/material';
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
  size
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${theme.palette.card.border}`,
        backgroundColor: theme.palette.card.background,
        borderRadius: 2,
        padding: '16px',
        marginBottom: 2,
        boxShadow: theme.palette.mode === 'light'
          ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
          : '0px 4px 8px rgba(255, 255, 255, 0.05)',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          borderColor: theme.palette.card.hover
        }
      }}
    >
      {/* Image */}
      <Box sx={{ flexShrink: 0, marginRight: 2 }}>
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt={name}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.divider}`
          }}
        />
      </Box>

      {/* Product Details */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomTypography variant="body1" sx={{ fontWeight: 500, color: theme.palette.card.text }}>
            {name}
          </CustomTypography>

          {/* Edit/Delete Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <CustomIconButton onClick={onEdit}>
              <ModeEditOutlineOutlinedIcon sx={{ color: theme.palette.text.primary }} />
            </CustomIconButton>

            <Divider orientation='vertical' flexItem sx={{ height: 48, backgroundColor: theme.palette.divider }} />

            <CustomIconButton onClick={onRemove}>
              <DeleteForeverOutlinedIcon sx={{ color: '#e53935' }} />
            </CustomIconButton>
          </Box>
        </Box>

        {/* Price and Offer */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CustomTypography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px', mr: 1, color: theme.palette.text.secondary }}>
            ₹{discounted_price || actual_price}
          </CustomTypography>

          {discounted_price && (
            <CustomTypography variant="body2" sx={{ textDecoration: 'line-through', mr: 1, color: theme.palette.text.secondary }}>
              ₹{actual_price}
            </CustomTypography>
          )}

          <CustomTypography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            ₹{offer}% {t("off")}
          </CustomTypography>
        </Box>

        {/* Size and Quantity */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomTypography variant="body2" sx={{ mr: 1, color: theme.palette.text.secondary }}>
            {t("Size")}: {size}
          </CustomTypography>

          <Divider orientation='vertical' flexItem sx={{ height: 28, mx: 1, backgroundColor: theme.palette.divider }} />

          <CustomTypography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {t("Quantity")}: {quantity}
          </CustomTypography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartProductCard;
