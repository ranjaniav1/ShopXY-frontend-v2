import React, { useState, useEffect } from 'react';
import { getOrder } from '@/app/Service/Profile';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Typography, useTheme } from '@mui/material';
import CustomButton from '@/app/Custom/CustomButton';
import { fetchOrder } from '@/app/helper/ProfileUtils';

const UserOrders = ({ userId,activeTab }) => {
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
                backgroundColor: theme.palette.card.background
              }}
            >
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="div">
                    Order ID: {orderItem._id}
                  </Typography>
                  <CustomButton
                    onClick={() => generateInvoice(orderItem)}
                    className="px-4 py-2 rounded-md transition-all duration-200"
                    title="Download Invoice"
                  />
                </Grid>
                <Divider sx={{ margin: "16px 0" }} />

                <Grid container justifyContent="space-between" sx={{ marginBottom: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                      Order Status: {orderItem.orderStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Typography
                      variant="body1"
                      color={theme.palette.text.secondary}
                      sx={{ textAlign: "right" }}
                    >
                      Order Date: {new Date(orderItem.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ border: `1px dotted ${theme.palette.divider}`, borderRadius: 2, marginBottom: 2 }}>
                  {orderItem.product.map((item, index) => (
                    <Box key={item._id}>
                      <Box sx={{ display: "flex", alignItems: "center", borderRadius: 1 }}>
                        <CardMedia
                          component="img"
                          image={item.product.image}
                          alt={item.product.name}
                          sx={{ width: 80, height: 80, objectFit: "cover", margin: 1 }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="h6">{item.product.name}</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                              <Typography
                                variant="body1"
                                sx={{ color: theme.palette.primary.main, marginTop: 1 }}
                              >
                                Price: ₹{item.product.discounted_price.toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1" color={theme.palette.text.secondary}>
                                {item.product.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                              <Typography variant="body1" color={theme.palette.text.secondary} sx={{ textAlign: "right" }}>
                                Qty: {item.quantity}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Box>
                      {index < orderItem.product.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ margin: "16px 0" }} />

                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                      Payment Type: {orderItem.paymentType}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                      Total Price: ₹{orderItem.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" align="center">
          No orders found.
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page <= 1}>
                Previous
              </Button>
              <Typography variant="body2">
                Page {page} of {totalPages}
              </Typography>
              <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page >= totalPages}>
                Next
              </Button>
            </Box>
    </div>
  );
};

export default UserOrders;
