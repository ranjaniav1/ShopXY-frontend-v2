'use client';
import React, { useEffect, useState } from 'react';
import { GetAllProducts } from '@/app/Service/GetProduct';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';


const FilterConfig = () => {
    const [products, setProducts] = useState([]);

    const GetProducts = async () => {
        try {
            const response = await GetAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
    useEffect(() => {
        GetProducts();
    }, []);
    return (
        <FilterBasedProduct products={products} />
    );
};

export default FilterConfig;
