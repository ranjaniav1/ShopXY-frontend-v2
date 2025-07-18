"use client";
import React, { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Logout } from "@/app/Service/User";

const NavProfileMenu = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
const userId=user?._id
 
 const handleLogout = async () => {
    try {
      await Logout({ userId });
      setUser(null);
      toast.success("User logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } 
  };
  return (
    <div className="relative">
      <img
        onClick={() => setOpen(!open)}
        src={user?.avatar}
        className="w-8 h-8 rounded-full cursor-pointer"
        alt="avatar"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40  shadow-md rounded-md z-50 border border-secondary">
          <button
            onClick={() => {
              setOpen(false);
              router.push(`/user/${user.fullname}`);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-secondary/20"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-secondary/20"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavProfileMenu;
