// CustomModal.js
import React from "react";
import { Modal, Box, Typography, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomIconButton from "./CustomIconButton";

const CustomModal = ({ open, onClose, title, children,height})=>{
  const theme = useTheme();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          height:height,
          width: {
            xs: "90%",
            sm: 400,
            md: 500,
          },          margin: "auto",
          padding: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: theme.shadows[5],
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: theme.palette.text.primary
        }}
      >
        {/* Modal Heading */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: theme.palette.text.primary }}
          >
            {title}
          </Typography>
          {/* Close Button */}
          <CustomIconButton onClick={onClose}>
            <CloseIcon />
          </CustomIconButton>
        </Box>

        {/* Modal Content */}
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
