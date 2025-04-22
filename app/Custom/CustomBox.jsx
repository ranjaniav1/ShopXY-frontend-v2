"use client"
import { Box, useTheme } from '@mui/material'
import React from 'react'

const CustomBox = ({ children ,sx}) => {
    const theme = useTheme()
    return (
        <Box className="my-7   rounded-md "sx={{sx}}>{children}
        </Box>
    )
}

export default CustomBox
