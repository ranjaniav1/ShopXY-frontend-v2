'use client';

import React, { useEffect, useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import FilterSection from './FilterSection';
import ProductList from './ProductList';
import Heading from '../Common/Heading';
import { GetAllProducts } from '../Service/GetProduct';
import { useTranslation } from 'react-i18next';

const HomeProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [rating, setRating] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const result = await GetAllProducts();
                setProducts(result.data);
                setBrands([...new Set(result.data.map(p => p.brand))]);
                setFilteredProducts(result.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = products
                .filter(p => p.actual_price >= priceRange[0] && p.actual_price <= priceRange[1])
                .filter(p => !selectedBrands.length || selectedBrands.includes(p.brand))
                .filter(p => !rating || p.ratings >= parseFloat(rating));

            if (sortOrder === 'price-low-to-high') filtered.sort((a, b) => a.actual_price - b.actual_price);
            if (sortOrder === 'price-high-to-low') filtered.sort((a, b) => b.actual_price - a.actual_price);
            if (sortOrder === 'rating-based') filtered.sort((a, b) => b.ratings - a.ratings);
            if (sortOrder === 'discount-based') filtered.sort((a, b) => b.discounted_price - a.discounted_price);

            setFilteredProducts(filtered);
        };
        applyFilters();
    }, [selectedBrands, priceRange, rating, sortOrder, products]);

    return (
        <>
            <Heading text={t("Products For You")} />
            <Grid container spacing={3} >
                <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
                    <FilterSection
                        brands={brands}
                        selectedBrands={selectedBrands}
                        setSelectedBrands={setSelectedBrands}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        rating={rating}
                        setRating={setRating}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        handleResetFilters={() => {
                            setSelectedBrands([]);
                            setPriceRange([0, 1000]);
                            setRating('');
                            setSortOrder('');
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={9} sx={{ mt: 3.5 }}>
                    <ProductList products={filteredProducts} loading={loading} />
                </Grid>
            </Grid>
        </>
    );
};

export default HomeProduct;
