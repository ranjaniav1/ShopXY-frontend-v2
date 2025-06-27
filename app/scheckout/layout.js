"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchCart } from "../helper/cartUtils";
import CartPage from "./carts/page";
import AddressPage from "./address/page";
import PaymentPage from "./payment/page";
import EmptyCart from "../Components/EmptyCart";
import PriceDetails from "../Components/PriceDetail";
import CustomBox from "../Custom/CustomBox";
import { useUser } from "../context/UserContext";

const Layout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cartData, setCartData] = useState([]);
  const pathname = usePathname();
  const { user } = useUser();
  const userId = user?._id;

  const steps = ["Cart", "Address", "Payment"];

  const loadCart = async () => {
    try {
      const data = await fetchCart(userId);
      setCartData(data);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  useEffect(() => {
    if (pathname === "/scheckout/carts") setActiveStep(0);
    else if (pathname === "/scheckout/address") setActiveStep(1);
    else if (pathname === "/scheckout/payment") setActiveStep(2);
  }, [pathname]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="hidden sm:flex justify-center py-6">
        <div className="flex w-full max-w-4xl items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            return (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                {/* Line connector (except last step) */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 right-0 left-1/2 transform translate-x-1/2 h-0.5 bg-gray-300 z-[-1]">
                    <div
                      className={`h-full ${
                        isCompleted ? "bg-primary" : "bg-gray-300"
                      } w-full`}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 z-10
                    ${
                      isCompleted
                        ? "bg-primary text-white border-primary"
                        : isActive
                        ? "bg-white text-primary border-primary"
                        : "bg-gray-200 text-gray-500 border-gray-300"
                    }`}
                >
                  {index + 1}
                </div>

                {/* Step Label */}
                <span
                  className={`text-sm mt-2 text-center ${
                    isCompleted || isActive ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Step Info */}
      <div className="sm:hidden text-center text-sm py-2 text-primary">
        Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
      </div>

      {/* Checkout Content */}
      <CustomBox>
        <div className="max-w-screen-xl mx-auto px-4">
          {cartData?.products?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-[7fr_1fr_4fr] gap-4">
              {/* Left: Pages */}
              <div>
                {pathname === "/scheckout/carts" && (
                  <CartPage loadCart={loadCart} cartData={cartData} />
                )}
                {pathname === "/scheckout/address" && (
                  <AddressPage handleBack={handleBack} handleNext={handleNext} />
                )}
                {pathname === "/scheckout/payment" && (
                  <PaymentPage loadCart={loadCart} cartData={cartData} />
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:flex justify-center">
                <div className="w-px bg-gray-200 h-full" />
              </div>

              {/* Right: Price Details */}
              <div>
                <PriceDetails
                  numberOfItems={cartData.products?.length || 0}
                  totalProductPrice={cartData.totalPrice}
                  totalDiscount={cartData.discountPrice}
                  orderTotal={cartData.totalPrice}
                />
              </div>
            </div>
          ) : (
            <EmptyCart
              src="/empty_cart.png"
              title="Don’t worry, you can add your products here. Simply click on Start Shopping."
            />
          )}
        </div>
      </CustomBox>
    </div>
  );
};

export default Layout;
