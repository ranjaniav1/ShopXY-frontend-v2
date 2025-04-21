'use client';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';
import React, {  useState } from 'react';



const FilterConfig = () => {
    const [products, setProducts] = useState([]);

    return (
        <FilterBasedProduct products={products} />
    );
};

export default FilterConfig;
