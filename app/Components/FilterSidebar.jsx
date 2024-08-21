'use client';
import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Divider, Box, Select, MenuItem, useTheme } from '@mui/material';
import { GetSingleBrands } from '../Service/GetBrands';
import { useParams } from 'next/navigation';

const FilterSidebar = ({ onBrandChange, brand_id }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical');
  const { collectionId } = useParams()
  const GetBrands = async () => {
    try {
      const result = await GetSingleBrands({ brand_id: collectionId });
      setBrands(result.data);
      console.log("brands", result.data)
    } catch (error) {
      console.log("Failed to fetch brands", error);
    }
  };

  useEffect(() => {
    GetBrands();
  }, [brand_id]);

  useEffect(() => {
    sortBrands(sortOption);
  }, [brands, sortOption]);

  const sortBrands = (option) => {
    let sortedBrands = [...brands];
    switch (option) {
      case 'alphabetical':
        sortedBrands.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'reverse-alphabetical':
        sortedBrands.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Add other sorting logic if necessary
      default:
        break;
    }
    setBrands(sortedBrands);
  };

  const handleCheckboxChange = (event, brandId) => {
    const updatedSelectedBrands = event.target.checked
      ? [...selectedBrands, brandId]
      : selectedBrands.filter((id) => id !== brandId);

    setSelectedBrands(updatedSelectedBrands);
    onBrandChange(updatedSelectedBrands);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  const theme = useTheme()
  return (
    <Box sx={{ width: '100%', padding: '16px', backgroundColor: theme.palette.background.main, border: '1px solid #e0e0e0', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h6">Filters</Typography>
      <Divider sx={{ my: 2 }} />

      {/* Sort By Dropdown */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Sort By
        </Typography>
        <Select value={sortOption} onChange={handleSortChange} sx={{ width: '100%' }}>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
          <MenuItem value="reverse-alphabetical">Reverse Alphabetical</MenuItem>
          <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
          <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
          <MenuItem value="rating-based">Rating Based</MenuItem>
          <MenuItem value="discount-based">Discount Based</MenuItem>
        </Select>
      </Box>
{/* Rating Filter */}
<Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Filter by Rating
        </Typography>
        <Select  sx={{ width: '100%' }}>
          <MenuItem value="2-3">2.0 to 3.0</MenuItem>
          <MenuItem value="3-4">3.0 to 4.0</MenuItem>
          <MenuItem value="4-5">4.0 to 5.0</MenuItem>
          {/* Add more rating ranges if necessary */}
        </Select>
      </Box>

      {/* Brands Filtering */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Brands
        </Typography>
        <FormGroup>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    color="primary"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={(e) => handleCheckboxChange(e, brand.id)}
                  />
                }
                label={brand.title}
                sx={{ mb: 1 }}
              />
            ))
          ) : (
            <Typography variant="body2">No brands available</Typography>
          )}

        </FormGroup>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
