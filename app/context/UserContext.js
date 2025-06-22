'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { GetCurrentUser } from '@/app/Service/User';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      try {
        setUserState(JSON.parse(cookieUser));
      } catch {
        Cookies.remove("user"); // remove corrupt cookie
      }
    } else {
      fetchUser(); // fallback to API
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await GetCurrentUser();
      if (res?.data?.data) {
        setUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      Cookies.set("user", JSON.stringify(userData), {
        expires: 7,
        secure: true,
        sameSite: "Lax",
      });
    } else {
      Cookies.remove("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
