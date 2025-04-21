import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import CustomButton from '@/app/Custom/CustomButton';
import { fetchOrder } from '@/app/helper/ProfileUtils';
import CustomTypography from '@/app/Custom/CustomTypography';

const UserOrders = ({ userId, activeTab }) => {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const generateInvoice = (orderItem) => {
    console.log("Generating invoice for:", orderItem);
  };

  return (
    <div>
      {order.length > 0 ? (
        order.map((orderItem) => (
          <Box key={orderItem._id}>
            <Card
              sx={{
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 1,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.card?.background || '#fff',
              }}
            >
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                >
                  <Grid item>
                    <CustomTypography variant="h6">Order ID: {orderItem._id}</CustomTypography>
                  </Grid>
                  <Grid item>
                    <CustomButton
                      onClick={() => generateInvoice(orderItem)}
                      className="px-4 py-2 rounded-md transition-all duration-200"
                      title="Download Invoice"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid
                  container
                  spacing={1}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <CustomTypography variant="body1" color={theme.palette.text.secondary}>
                      Order Status: {orderItem.orderStatus}
                    </CustomTypography>
                  </Grid>
                  <Grid item>
                    <CustomTypography
                      variant="body1"
                      color={theme.palette.text.secondary}
                      sx={{ textAlign: { xs: 'left', sm: 'right' } }}
                    >
                      Order Date: {new Date(orderItem.createdAt).toLocaleDateString()}
                    </CustomTypography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    border: `1px dotted ${theme.palette.divider}`,
                    borderRadius: 2,
                    my: 2,
                  }}
                >
                  {orderItem.product.map((item, index) => (
                    <Box key={item._id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <CardMedia
                          component="img"
                          image={item.product.image}
                          alt={item.product.name}
                          sx={{
                            width: { xs: 60, sm: 80 },
                            height: { xs: 60, sm: 80 },
                            objectFit: 'cover',
                            m: 1,
                            borderRadius: 1,
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <CustomTypography variant="h6">{item.product.name}</CustomTypography>
                              <CustomTypography variant="body2" color={theme.palette.text.secondary}>
                                {item.product.description}
                              </CustomTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="flex-start" direction="column">
                              <CustomTypography variant="body1" sx={{ color: theme.palette.primary.main }}>
                                Price: ₹{item.product.discounted_price.toFixed(2)}
                              </CustomTypography>
                              <CustomTypography variant="body2" color={theme.palette.text.secondary}>
                                Qty: {item.quantity}
                              </CustomTypography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Box>
                      {index < orderItem.product.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid
                  container
                  spacing={1}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <CustomTypography variant="body2" color={theme.palette.text.secondary}>
                      Payment Type: {orderItem.paymentType}
                    </CustomTypography>
                  </Grid>
                  <Grid item>
                    <CustomTypography variant="body2" color={theme.palette.text.secondary}>
                      Total Price: ₹{orderItem.totalPrice}
                    </CustomTypography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <CustomTypography variant="body2" color="text.secondary" align="center">
          No orders found.
        </CustomTypography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page <= 1}>
          Previous
        </Button>
        <CustomTypography variant="body2">
          Page {page} of {totalPages}
        </CustomTypography>
        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page >= totalPages}>
          Next
        </Button>
      </Box>
    </div>
  );
};

export default UserOrders;
