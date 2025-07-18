// ✅ File: app/scheckout/[step]/page.tsx
"use client";


import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { fetchCart } from "@/app/helper/cartUtils";
import AddressPage from "@/app/Components/checkout/AddressPage";
import CartPageWrapper from "@/app/Components/checkout/CartPageWrapper";
import PaymentPage from "@/app/Components/checkout/PaymentPage";

export default function CheckoutStepPage() {
  const { step } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?._id;

  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    if (step === "payment" && userId) {
      fetchCart(userId).then(setCartData);
    }
  }, [step, userId]);
  // ✅ Set document title based on step
  useEffect(() => {
    const titleMap = {
      carts: "Checkout - Cart",
      address: "Checkout - Address",
      payment: "Checkout - Payment",
    };

    document.title = titleMap[step] || "ShopXY - Checkout";
  }, [step]);
  const handleNext = () => {
    if (step === "carts") router.push("/scheckout/address");
    else if (step === "address") router.push("/scheckout/payment");
  };

  const handleBack = () => {
    if (step === "payment") router.push("/scheckout/address");
    else if (step === "address") router.push("/scheckout/carts");
  };

  switch (step) {
    case "carts":
      return <CartPageWrapper />;
    case "address":
      return <AddressPage handleNext={handleNext} handleBack={handleBack} />;
    case "payment":
      return (
        cartData && (
          <PaymentPage handleBack={handleBack} cartData={cartData} loadCart={() => fetchCart(userId).then(setCartData)} />
        )
      );
    default:
      return <div className="p-8 text-center">Invalid step</div>;
  }
}
