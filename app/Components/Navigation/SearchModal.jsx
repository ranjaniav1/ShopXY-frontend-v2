import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CustomInput from '@/app/Custom/CustomInput';
import { Search } from '@mui/icons-material';

const SearchModal = ({ searchQuery, setSearchQuery, onSearch }) => {

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" flexDirection="row" mb={2}>
                <CustomInput endIcon={<Search onClick={() => onSearch()} />}
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                />
            </Box>
        </Box>
    );
};

export default SearchModal;
