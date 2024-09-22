"use client";
import CustomBox from "@/app/Custom/CustomBox";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
("use client");
import React from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth?.user?.data?.user);
  return (
    <CustomBox>
      <Grid container spacing={4}>
        {/* left side */}
        <Grid xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2
            }}
          >
            <Avatar
              src={user?.avatar || "/default-avatar.png"}
              alt={user?.fullname || "User Avatar"}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: "1px solid #22aa99"
              }}
            />
            <Typography variant="h6" gutterBottom>
              {user?.fullname || "Your Name"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {user?.email || "Email not available"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {user?.phone || "phone not available"}
            </Typography>
          </Box>
        </Grid>
        <Divider orientation="Vertical" sx={{ color: "gray" }} />
        {/* right side */}
        <Grid xs={12} md={4}>
          {children}
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Layout;
