'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import { GetHomeScreenData } from '../Service/GetHomeScreenData';
import CustomSkeleton from '../Common/CustomSkeleton';

const SaleAndDiscount = () => {
    const [collection, setcollection] = useState([]);
    const [loading, setLoading] = useState(true);

    async function GetCollection() {
        try {
            const result = await GetHomeScreenData();
            console.log("sale and discount", result.sale_and_discount_product);
            setcollection(result.sale_and_discount_product);
        } catch (error) {
            console.log("failed to fetch collection", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetCollection();
    }, []);

    const skeletonCount = 6; // Number of skeletons to show

    return (
        <>
            <Heading text="Best Discount Products" />
            <div className='my-4 div-body'>
                {loading ? (
                    <div className="p-4 flex space-x-10">
                        {Array.from({ length: skeletonCount }).map((_, index) => (
                            <CustomSkeleton
                                key={index}
                                type="card"
                                width="96px"
                                height="96px"
                            />
                        ))}
                    </div>
                ) : collection && collection.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4 py-4 gap-6">
                        {collection.slice(0, 6).map((category) => (
                            <div
                                key={category.id}
                                className="relative flex flex-col items-center border border-btn rounded-md overflow-hidden shadow-lg div-body"
                            >
                                <img
                                    src={category.banner_image}
                                    alt={category.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                                    Sale
                                </div>
                                <p className="text-lg font-semibold text-center p-4">{category.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No collection found</p>
                )}
            </div>
        </>
    );
};

export default SaleAndDiscount;
