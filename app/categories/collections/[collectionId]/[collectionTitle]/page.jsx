'use client';
import FilterBasedProduct from '@/app/Components/FilterBasedProduct';
import FilterSidebar from '@/app/Components/FilterSidebar';
import { useParams } from 'next/navigation';
import React from 'react';


const Page = () => {
  const {collectionId}=useParams()
  console.log("jsnj",collectionId)
    return (
        <div className="flex flex-col md:flex-row">
            <FilterSidebar brand_id={collectionId}/>
            <FilterBasedProduct />
        </div>
    );
};

export default Page;
