import React from "react";
import Stepper from "../Components/Stepper";
import CustomBox from "../Custom/CustomBox";


export const metadata = {
  title: "Secure Checkout",
};

const steps = ["Cart", "Address", "Payment"];

export default function CheckoutLayout({ children }) {
  return (
    <div className="w-full">
      <Stepper steps={steps} />
      <CustomBox>
        <div className="max-w-screen-xl mx-auto px-4">{children}</div>
      </CustomBox>
    </div>
  );
}