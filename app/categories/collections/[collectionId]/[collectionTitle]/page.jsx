'use client';
import React, { useEffect, useState } from 'react';
import { GetAllProducts } from '@/app/Service/GetProduct';
import FilterSidebar from '@/app/Components/FilterSidebar';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';
import { useParams } from 'next/navigation';
import { Grid } from '@mui/material';


const FilterConfig = () => {
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

    return (
        <FilterBasedProduct products={products} />
    );
};

export default FilterConfig;
