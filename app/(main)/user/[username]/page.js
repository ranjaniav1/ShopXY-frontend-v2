"use client"
import UserLayout from "@/app/Components/profile/UserLayout";
import { useEffect } from "react";

export default function UserProfilePage() {
  useEffect(() => {
    document.title = "ShopXY - User Profile";
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4">
      <UserLayout /></div>)
}