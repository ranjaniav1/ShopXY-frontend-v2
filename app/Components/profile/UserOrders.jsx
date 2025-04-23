import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CustomButton from '@/app/Custom/CustomButton';
import { fetchOrder } from '@/app/helper/ProfileUtils';
import CustomTypography from '@/app/Custom/CustomTypography';
import generateInvoice from './generateInvoice';

const UserOrders = ({ userId, activeTab }) => {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const theme = useTheme();

  useEffect(() => {
    if (userId) {
      fetchOrder(userId, page, 1, (data) => {
        setOrder(data.orders || []);
        setTotal(data.total || 0);
      });
    }
  }, [userId, page]);

  useEffect(() => {
    if (activeTab === 1) {
      setPage(1);
    }
  }, [activeTab]);

  const totalPages = Math.ceil(total / 1);



  return (
    <Box>
      {order.length > 0 ? (
        order.map((orderItem) => (
          <Card
            key={orderItem._id}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              mb: 3,
              px: 2,
              py: 2,
              backgroundColor: theme.palette.background.main,
              transition: '0.3s ease',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.005)',
              },
            }}
          >
            <CardContent>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm="auto">
                  <CustomTypography variant="h6" fontWeight="bold" sx={{color:theme.palette.text.primary}}>
                    Order ID: {orderItem._id}
                  </CustomTypography>
                </Grid>
                <Grid item>
                  <CustomButton
                    onClick={() => generateInvoice(orderItem)}
                    title="Download Invoice"
                    className="px-4 py-2 rounded-md transition-all duration-200"
                    />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid container justifyContent="space-between">
                <Grid item xs={12} sm="auto">
                  <CustomTypography sx={{color:theme.palette.text.secondary}}>
                    Order Status: {orderItem.orderStatus}
                  </CustomTypography>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <CustomTypography sx={{color:theme.palette.text.secondary}} textAlign="right">
                    Order Date: {new Date(orderItem.createdAt).toLocaleDateString()}
                  </CustomTypography>
                </Grid>
              </Grid>

              <Box
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 2,
                  my: 2,
                }}
              >
                {orderItem.product.map((item, index) => (
                  <Box key={item._id}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        alignItems: 'center',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.product.image}
                        alt={item.product.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <CustomTypography variant="subtitle1" fontWeight="bold">
                              {item.product.name}
                            </CustomTypography>
                            <CustomTypography variant="body2" sx={{color:theme.palette.text.secondary}}>
                              {item.product.description}
                            </CustomTypography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            justifyContent="flex-end"
                            direction="column"
                            alignItems="flex-end"
                          >
                            <CustomTypography  fontWeight="bold" sx={{color:theme.palette.text.secondary}}>
                              ₹{item.product.discounted_price.toFixed(2)}
                            </CustomTypography>
                            <CustomTypography variant="body2" sx={{color:theme.palette.text.primary}}>
                              Qty: {item.quantity}
                            </CustomTypography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    {index < orderItem.product.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </Box>

              <Grid container justifyContent="space-between" mt={2}>
                <Grid item>
                  <CustomTypography variant="body2" sx={{color:theme.palette.text.primary}}>
                    Payment Type: {orderItem.paymentType}
                  </CustomTypography>
                </Grid>
                <Grid item>
                  <CustomTypography variant="body2" sx={{color:theme.palette.text.primary}}>
                    Total Price: ₹{orderItem.totalPrice}
                  </CustomTypography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <CustomTypography variant="body2" sx={{color:theme.palette.text.primary}} align="center" mt={3}>
          No orders found.
        </CustomTypography>
      )}

      {/* Pagination Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <CustomTypography variant="body2" sx={{color:theme.palette.text.secondary}}>
          Page {page} of {totalPages}
        </CustomTypography>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UserOrders;
