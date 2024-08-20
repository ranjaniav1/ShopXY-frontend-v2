'use client';
import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Divider, Box, Select, MenuItem } from '@mui/material';
import { GetSingleBrands } from '../Service/GetBrands';

const FilterSidebar = ({ onBrandChange, brand_id }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical');

  const GetBrands = async () => {
    try {
      const result = await GetSingleBrands({ brand_id });
      setBrands(result.data);
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

  return (
    <Box sx={{ width: '100%', padding: '16px', backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
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
          {/* Add other sort options here */}
        </Select>
      </Box>

      {/* Brands Filtering */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Brands
        </Typography>
        <FormGroup>
          {brands.map((brand) => (
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
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
