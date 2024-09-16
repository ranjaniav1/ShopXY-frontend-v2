
import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomTypography from '../Custom/CustomTypography';

const Heading = ({ text, className, children }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} className={`font-semibold text-left btn pl-3 rounded-md text-xl pr-3`}>
            <CustomTypography variant="h4" className={`font-bold text-left ${className} p-2`}>{text}</CustomTypography>
            {children && (
                <div className="ml-4">
                    {children}
                </div>
            )}
        </Box>
    );
};

export default Heading;
