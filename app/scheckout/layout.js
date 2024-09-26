"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/app/Service/Cart";
import {
  Box,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme
} from "@mui/material";
import PriceDetails from "@/app/Components/PriceDetail";
import CustomBox from "@/app/Custom/CustomBox";
import { setMyCart } from "../redux/reducer/cartReducer";
import CustomButton from "../Custom/CustomButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const userId =
    useSelector((state) => state.auth?.user?.data?.user?._id) || "test";
  const dispatch = useDispatch();
  const pathname = usePathname();
  const theme = useTheme();
  const { t } = useTranslation();
  const isCart = useSelector((state) => state.cart.cart.data);

  const fetchCartData = async () => {
    try {
      const response = await getCart(userId);
      dispatch(setMyCart(response));
    } catch (err) {
      setError(err.message || "Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (pathname === "/scheckout/carts") {
      setActiveStep(0);
    } else if (pathname === "/scheckout/address") {
      setActiveStep(1);
    } else if (pathname === "/scheckout/payment") {
      setActiveStep(2);
    }
  }, [pathname]); // Listen to pathname changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const steps = ["Cart", "Address", "Payment"];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <Box>
      <Stepper
        sx={{
          ".Mui-completed .MuiStepIcon-root": {
            background: theme.palette.button.color,
            borderRadius: "50%",
            color: theme.palette.button.background
          },
          ".Mui-active .MuiStepIcon-root": {
            color: "#22aa99" // Active step icon color
          },
          ".css-rxa01a-MuiSvgIcon-root-MuiStepIcon-root": {
            color: "white"
          }
        }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <CustomBox>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {isCart ? (
              <>
                {/* Grid for children (cart items) */}
                <Grid item xs={12} md={7}>
                  {React.cloneElement(children, { handleNext, handleBack })}
                </Grid>

                {/* Vertical Divider */}
                <Grid
                  item
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "stretch"
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "stretch"
                    }}
                  >
                    <Divider orientation="vertical" flexItem />
                  </Box>
                </Grid>

                {/* Price Details Section */}
                <Grid item xs={12} md={4}>
                  <PriceDetails
                    numberOfItems={isCart.products.length}
                    totalProductPrice={isCart.totalPrice}
                    totalDiscount={isCart.discountPrice}
                    orderTotal={isCart.totalPrice}
                  />
                </Grid>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Adjust this value as needed
                  width: "100%", // Adjust this value as needed
                  textAlign: "center",
                  paddingBottom: 2,
                  paddingTop: 2,
                }}
              >
                <img
                  src="https://cdn1.vectorstock.com/i/1000x1000/43/85/young-man-pushing-a-shopping-empty-cart-vector-13494385.jpg"
                  alt="Your cart is empty"
                  style={{
                    height: "400px",
                    maxWidth: "100%",
                    objectFit: "cover"
                  }}
                />{" "}
                <Typography>
                  Don&apos;t worry , you can add your products here ..simply
                  click on start shopping{" "}
                </Typography>
                <Link href="/categories/collections" passHref>
                  <CustomButton title="Start Shopping" />
                </Link>
              </Box>
            )}
          </Grid>
        </Container>
      </CustomBox>
    </Box>
  );
};

export default Layout;
