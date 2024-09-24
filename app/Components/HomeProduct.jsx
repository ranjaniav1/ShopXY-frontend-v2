"use client";

import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import FilterSection from './FilterSection';
import 
ProductList from './ProductList';
import Heading from '../Common/Heading';
import { GetAllProducts } from '../Service/GetProduct';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const { t } = useTranslation();

    async function fetchProducts() {
        try {
            const result = await GetAllProducts();
            setProducts(result.data);
            setFilteredProducts(result.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    }

    useEffect(() => {
        fetchProducts();
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = products
                .filter(p => p.discounted_price >= priceRange[0] && p.discounted_price <= priceRange[1])
                .filter(p => {
                    return selectedRatings.length === 0 || selectedRatings.some(range => {
                        return p.ratings >= range[0] && p.ratings <= range[1];
                    });
                });

            setFilteredProducts(filtered);
        };
        applyFilters();
    }, [selectedRatings, priceRange, products]);

    return (
        <>
            <Heading text={t("Products For You")} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
                    <FilterSection
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedRatings={selectedRatings}
                        setSelectedRatings={setSelectedRatings}
                        handleResetFilters={() => {
                            setSelectedRatings([]);
                            setPriceRange([0, 1000]);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={9} sx={{ mt: 3.5 }} data-aos="fade-up">
                    {loading ? (
                        <Typography variant="h6" align="center">{t("Loading...")}</Typography>
                    ) : filteredProducts.length === 0 ? (
                        <Typography variant="h6" align="center">{t("No products found")}</Typography>
                    ) : (
                        <ProductList products={filteredProducts} loading={loading} />

                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default HomeProduct;
