import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomButton from '../Custom/CustomButton'
import Link from 'next/link'
import CustomTypography from '../Custom/CustomTypography'

const EmptyCart = () => {
  return (
    <Box
                   sx={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%", // Adjust this value as needed
                     width: "100%", // Adjust this value as needed
                     textAlign: "center",
                     paddingBottom: 2,
                     paddingTop: 2
                   }}
                 >
                   <img
                     src="/empty_cart.png"
                     alt="Your cart is empty"
                     style={{
                       height: "400px",
                       maxWidth: "100%",
                       objectFit: "cover",
                       animation: "scale 2s infinite alternate" // Animation applied here
                     }}
                   />
   
                   <CustomTypography>
                     Don&apos;t worry, you can add your products here. Simply click
                     on Start Shopping.
                   </CustomTypography>
   
                   <Link href="/categories/collections" passHref>
                     <CustomButton title="Start Shopping" />
                   </Link>
   
                   {/* CSS Animation Styles */}
                   <style>
                     {`
                     @keyframes scale {
                       0% {
                         transform: scale(1);
                       }
                       100% {
                         transform: scale(1.05);
                       }
                     }
                   `}
                   </style>
                 </Box>
  )
}

export default EmptyCart
