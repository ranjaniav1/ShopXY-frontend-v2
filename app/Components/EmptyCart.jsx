import { Box, useTheme } from '@mui/material'
import React from 'react'
import CustomButton from '../Custom/CustomButton'
import Link from 'next/link'
import CustomTypography from '../Custom/CustomTypography'

const EmptyCart = ({ src, title, buttonHref = "/categories/collections", buttonText = "Start Shopping", subtitle }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        textAlign: "center",
        paddingBottom: 10,
        paddingTop: 2,
        paddingTop: 2, background: theme.palette.background.main,
        color: theme.palette.text.primary
      }}
    >
      <img
        src={src}
        alt="empty content"
        style={{
          height: "250px",
          objectFit: "cover",
          animation: "scale 2s infinite alternate"
        }}
      />

      <CustomTypography variant="h6" sx={{ mb: 1 }}>
        {title}
      </CustomTypography>
      {subtitle && (
        <CustomTypography variant="body2" sx={{ mb: 3, maxWidth: 400, color: theme.palette.text.secondary }}>
          {subtitle}
        </CustomTypography>
      )}
      <Link href={buttonHref} passHref>
        <CustomButton title={buttonText} />
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
