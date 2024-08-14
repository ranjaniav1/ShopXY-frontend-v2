'use client';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';
import FilterSidebar from '@/app/Components/FilterSidebar';
import { GetSingleBrands } from '@/app/Service/GetBrands';
import { GetAllProducts, GetSpecificProducts } from '@/app/Service/GetProduct';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const Page = () => {
    const { collectionId } = useParams()
    console.log("jsnj", collectionId)
    const [brands, setBrands] = useState([]);
    const [productId, setProductId] = useState();

    async function GetCollection() {
        try {
            const result = await GetSingleBrands({ brand_id: collectionId });
            console.log("brands", result.data.id);
            setBrands(result.data);
        } catch (error) {
            console.log("failed to fetch collection", error);
        }
    }
    const [products, setProducts] = useState([]);

    async function GetProducts() {
        try {
            const response = await GetAllProducts();
            console.log("products", response.data);
            setProducts(response.data);
            if(productId){
                const myResult=await GetSpecificProducts({product_id:productId})
                console.log("my result",myResult)
                setProducts(myResult.data)
            }

        } catch (error) {
            console.log("failed to fetch products", error);
        }
    }



    useEffect(() => {
        GetCollection();
        GetProducts();
    }, [productId]);

    return (
        <div className="flex flex-col md:flex-row">
            <FilterSidebar brand_id={collectionId} brands={brands}setProductId={setProductId} />
            <FilterBasedProduct products={products} />
        </div>
    );
};

export default Page;
