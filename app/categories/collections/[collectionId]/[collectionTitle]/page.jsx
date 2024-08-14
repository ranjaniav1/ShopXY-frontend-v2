'use client';
import React, { useEffect, useState } from 'react';
import { GetAllProducts } from '@/app/Service/GetProduct';
import FilterSidebar from '@/app/Components/FilterSidebar';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';
import { useParams } from 'next/navigation';
import { Grid } from '@mui/material';

const Page = () => {
    const { collectionId } = useParams();
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        GetProducts();
    }, []);

    const GetProducts = async () => {
        try {
            const response = await GetAllProducts();
            setAllProducts(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const handleBrandChange = (brands) => {
        setSelectedBrands(brands);

        if (brands.length > 0) {
            // Filter products based on selected brand IDs
            const filteredProducts = allProducts.filter(product =>
                brands.includes(product.product_id) // Ensure this matches your product's brand field
            );
            console.log("brands chnage", filteredProducts)
            setProducts(filteredProducts);
        } else {
            setProducts(allProducts);
        }
    };

    return (
        <Grid container spacing={2} sx={{marginTop:2}}>
            <Grid item xs={12} md={3} >
                <FilterSidebar onBrandChange={handleBrandChange} brand_id={collectionId} />
            </Grid>
            <Grid item xs={12} md={9}>

                <FilterBasedProduct products={products} />
            </Grid>
        </Grid>
    );
};

export default Page;
