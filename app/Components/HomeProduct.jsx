'use client';

import React, { useEffect, useState } from 'react';
import { GetCategories } from '../Service/GetCategory';
import ProductCard from './ProductCard';
import { Container } from '@mui/material';
import Brands from '../Common/Brands';
import Heading from '../Common/Heading';

const HomeProduct = () => {
    const [products, setProducts] = useState([]);

    async function fetchCategories() {
        try {
            const result = await GetCategories();
            console.log("products", result.product);
            setProducts(result.product);
        } catch (error) {
            console.log("Failed to fetch products", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='my-4'>
            <Container maxWidth="xl" >
                <Heading text="Products for you" />
                <div className="flex">
                    <div className="w-1/4 p-4 border-r border-gray-200">
                        <Brands />
                    </div>
                    <div className="w-3/4 p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        imgSrc={product.image}
                                        title={product.name}
                                        price={product.actual_price}
                                        discountPrice={product.discounted_price}
                                        rating={product.ratings}
                                        description={product.description}
                                        offer={product.offer}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No products found</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container></div>
    );
};

export default HomeProduct;
