import React from "react";
import { Box, Typography } from "@mui/material";
import CustomTypography from "../Custom/CustomTypography";
import { useTheme } from "@emotion/react";

const Heading = ({ text, className, children }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      className={`font-semibold text-left btn pl-3 rounded-md text-xl pr-3`}
    >
      <CustomTypography
        variant="h4" sx={{color:theme.palette.text.primary}}
        className={`font-bold text-left p-2`}
      >
        {text}
      </CustomTypography>
      {children && <div className="ml-4">{children}</div>}
    </Box>
  );
};

export default Heading;
