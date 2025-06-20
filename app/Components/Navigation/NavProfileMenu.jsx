'use client';

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Logout } from "@/app/Service/User";
import { useUser } from "@/app/context/UserContext";

const NavProfileMenu = ({ user }) => {
  const router = useRouter();
  const { setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await Logout({ userId: user?._id });
      Cookies.remove("user");
      setUser(null);
      toast.success("Logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed.");
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push("/user/profile");
  };

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover border border-gray-300"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavProfileMenu;
