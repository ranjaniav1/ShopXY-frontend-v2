"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Logout } from "@/app/Service/User";

const NavProfileMenu = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const userId = user?._id
  const menuRef=useRef(null)

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
  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative"ref={menuRef}>
      <img
        onClick={() => setOpen(!open)}
        src={user?.avatar}
        className="w-8 h-8 rounded-full cursor-pointer"
        alt="avatar"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-40  shadow-md rounded-md z-50 border border-secondary bg-body">
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
