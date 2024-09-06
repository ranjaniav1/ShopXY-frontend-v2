import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import CustomInput from '@/app/Custom/CustomInput';
import { searchProduct } from '@/app/Service/search';
import { useRouter } from 'next/navigation';

const SearchModal = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter(); // Hook for navigation

    const handleSearch = async () => {
        if (!searchQuery) return;

        setLoading(true);
        setError('');
        try {
            const data = await searchProduct(searchQuery);
            router.forward(`category/collections/${data.id}/${data.title}`)
            setResults(data.products); // Adjust based on your response structure
        } catch (err) {
            setError('Failed to fetch results.');
        } finally {
            setLoading(false);
        }
    };
    // existing location=/category/collection/id/title
    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" flexDirection="row" mb={2}>
                <CustomInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    endIcon={<SearchIcon onClick={handleSearch} />}
                />
            </Box>

            {loading && <CircularProgress />}

            {error && <Typography color="error">{error}</Typography>}

        </Box>
    );
};

export default SearchModal;
