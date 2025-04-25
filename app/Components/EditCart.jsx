import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, useTheme, ButtonGroup, CircularProgress } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { EdittoCart } from '../Service/Cart';
import CustomButton from '../Custom/CustomButton';
import { useSelector } from 'react-redux';
import CustomTypography from '../Custom/CustomTypography';

const EditCart = ({ onClose, selectedProduct }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [localQuantity, setLocalQuantity] = useState(selectedProduct?.quantity || 1);
  const userId=useSelector((state)=>state.auth?.user?._id) 
  

  const theme = useTheme();

  useEffect(() => {
    if (selectedProduct) {
      setLocalQuantity(selectedProduct.quantity || 1);
    }
  }, [selectedProduct]);

  const updateCart = async (newQuantity) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await EdittoCart(userId, selectedProduct.product._id, newQuantity);
      setLocalQuantity(newQuantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setErrorMessage('Error updating cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    const maxQty = selectedProduct.product?.max_qty || 10;
    if (localQuantity + 1 <= maxQty) {
      updateCart(localQuantity + 1);
    } else {
      setErrorMessage(`You can add up to ${maxQty} units in one order`);
    }
  };

  const handleDecrement = () => {
    if (localQuantity > 1) {
      updateCart(localQuantity - 1);
    }
  };

  if (!selectedProduct) {
    return <CustomTypography variant="body2" color="textSecondary">No product selected.</CustomTypography>;
  }

  const totalPrice = (selectedProduct.product.discounted_price || 0) * localQuantity;

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: theme.palette.background.paper,
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <img
              src={selectedProduct.product.image}
              alt={selectedProduct.product.name}
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <CustomTypography sx={{ fontWeight: 'bold' ,color:theme.palette.card.text}}>{selectedProduct.product.name}</CustomTypography>
              <CustomTypography variant="body2" sx={{color: theme.palette.text.secondary}}>
                ₹{selectedProduct.product.discounted_price}
              </CustomTypography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <ButtonGroup sx={{ borderRadius: 2 }}>
                  <Button
                    onClick={handleDecrement}
                    sx={{ background: theme.palette.primary.main, color: 'white' }}
                  >
                    <RemoveIcon />
                  </Button>
                  <CustomTypography variant="h6" sx={{ mx: 16,color:theme.palette.text.secondary}}>{localQuantity}</CustomTypography>
                  <Button
                    onClick={handleIncrement}
                    sx={{ background: theme.palette.primary.main, color: 'white' }}
                  >
                    <AddIcon />
                  </Button>
                </ButtonGroup>
              </Box>
              {errorMessage && (
                <CustomTypography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errorMessage}
                </CustomTypography>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          <CustomTypography variant="body2" sx={{color:theme.palette.card.text}}>Total Price: ₹{totalPrice}</CustomTypography>
          <CustomButton onClick={onClose} title="Continue" sx={{ mt: 2 }} />
        </>
      )}
    </Box>
  );
};

export default EditCart;
