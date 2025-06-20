"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import PriceDetails from "@/app/Components/PriceDetail";
import CustomBox from "@/app/Custom/CustomBox";
import CustomButton from "../Custom/CustomButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCart } from "../helper/cartUtils";
import CartPage from "./carts/page";
import AddressPage from "./address/page";
import PaymentPage from "./payment/page";
import EmptyCart from "../Components/EmptyCart";
import { useUser } from "../context/UserContext";

const Layout = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

 const { user } = useUser(); // 👈 Get user from context
    const userId = user?._id;  

  const [cartData, setCartData] = useState([]);
  const pathname = usePathname();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const loadCart = async () => {
    try {
      const data = await fetchCart(userId);
      console.log("Fetched cart data:", data); // Add log here
      setCartData(data);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  useEffect(() => {
    if (pathname === "/scheckout/carts") {
      setActiveStep(0);
    } else if (pathname === "/scheckout/address") {
      setActiveStep(1);
    } else if (pathname === "/scheckout/payment") {
      setActiveStep(2);
    }
  }, [pathname]);

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
              color: theme.palette.button.background,
            },
            ".Mui-active .MuiStepIcon-root": {
              color: "#22aa99",
            },
            ".css-rxa01a-MuiSvgIcon-root-MuiStepIcon-root": {
              color: "white",
            },
          }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      

      <CustomBox>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {cartData && cartData.products && cartData.products.length > 0 ? (
              <>
                {/* Grid for children (cart items) */}
                <Grid item xs={12} md={7}>
                  {/* cart component ne call kr and aema props pass kr */}
                  {pathname === "/scheckout/carts" && <CartPage loadCart={loadCart} cartData={cartData} />}
                  {pathname === "/scheckout/address" && <AddressPage handleBack={handleBack} handleNext={handleNext} />}
                  {pathname === "/scheckout/payment" && <PaymentPage loadCart={loadCart} cartData={cartData} />}
                </Grid>

                {/* Vertical Divider */}
                <Grid
                  item
                  sx={{
                    display: { xs: "flex", md: "flex" },
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
                    {isXsScreen ? (
                      <Divider orientation="horizontal" flexItem />
                    ) : (
                      <Divider orientation="vertical" flexItem />
                    )}
                  </Box>
                </Grid>

                {/* Price Details Section */}
                <Grid item xs={12} md={4}>
                  <PriceDetails
                    numberOfItems={cartData.products?.length || 0}
                    totalProductPrice={cartData.totalPrice}
                    totalDiscount={cartData.discountPrice}
                    orderTotal={cartData.totalPrice}
                  />
                </Grid>
              </>
            ) : (
              <EmptyCart src="/empty_cart.png" title="Don&apos;t worry, you can add your products here. Simply click on Start Shopping."/>
            )}
          </Grid>
        </Container>
      </CustomBox>
    </Box>
  );
};

export default Layout;
