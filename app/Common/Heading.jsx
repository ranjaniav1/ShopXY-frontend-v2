// import React from 'react';

// const Heading = ({ text ,className}) => {
//     return (
//         <div >
//             <h2 className={` font-bold text-left${className} text-xl my-5 btn p-3 rounded-md `}>{text}</h2>
//         </div>
//     );
// };

// export default Heading;


import React from 'react';
import { Box, Typography } from '@mui/material';

const Heading = ({ text, className, children }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} className={`font-semibold text-left btn pl-3 rounded-md text-xl `}>
            <Typography
                variant="h5"
                component="h2"
                className={`font-bold text-left ${className} text-xl my-5 p-3`}
            >
                {text}
            </Typography>
            {children && (
                <div className="ml-4">
                    {children}
                </div>
            )}
        </Box>
    );
};

export default Heading;
