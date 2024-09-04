'use client'
import AddressDrawer from '@/app/Components/AddressDrawer'
import CustomButton from '@/app/Custom/CustomButton'
import CustomDrawer from '@/app/Custom/CustomDrawer'
import { AddAPhoto } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

const Page = () => {
    const [open, setOpen] = useState(false)
    async function handleAddAddressClick() {
        setOpen(true)
    }
    async function handleCloseDrawer() {
        setOpen(false)
    }
    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>

                <Typography >Select Delivery Address</Typography>
                <CustomButton title="Add new address" startIcon={<AddAPhoto />} onClick={handleAddAddressClick} />
            </Box>
            <CustomDrawer open={open} onClose={handleCloseDrawer} title="Add Delivery Address" children={<AddressDrawer onClose={handleCloseDrawer} />} />
        </div>
    )
}

export default Page
