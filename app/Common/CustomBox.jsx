import { Box, useTheme } from '@mui/material'
import React from 'react'

const CustomBox = ({children}) => {
    const theme = useTheme()
    return (
        <Box className="my-7 px-4 py-2 rounded-md " sx={{ background: theme.palette.background.main }}>{children}
        </Box>
    )
}

export default CustomBox
