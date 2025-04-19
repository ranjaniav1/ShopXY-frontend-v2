'use client';
import React, {  useState } from 'react';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';


const FilterConfig = () => {
    const [products, setProducts] = useState([]);

    return (
        <FilterBasedProduct products={products} />
    );
};

export default FilterConfig;
