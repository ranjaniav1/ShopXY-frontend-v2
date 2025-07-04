import React from "react";
import Stepper from "../Components/Stepper";


export const metadata = {
  title: "Secure Checkout",
};

const steps = ["Cart", "Address", "Payment"];

export default function CheckoutLayout({ children }) {
  return (
    <div className="w-full">
      <Stepper steps={steps} />

      <div className="max-w-screen-xl mx-auto px-4">{children}</div>

    </div>
  );
}