'use client';
import React, { useEffect, useState } from 'react';
import { GetAllProducts } from '@/app/Service/GetProduct';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';


const FilterConfig = () => {
    const [products, setProducts] = useState([]);

    return (
        <FilterBasedProduct products={products} />
    );
};

export default FilterConfig;
