'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import { GetHomeScreenData } from '../Service/GetHomeScreenData';
import CustomSkeleton from '../Common/CustomSkeleton';
import Link from 'next/link';
import CustomButton from '../Common/CustomButton';

const Collection = () => {
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6); // Number of items visible initially

    async function GetCollection() {
        try {
            const result = await GetHomeScreenData();
            console.log("catcollection", result.collection);
            setCollection(result.collection);
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

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Increase visible count
    };

    return (
        <>
            <Heading text="Best Deals on Electronics" />

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
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4 py-4 gap-6">
                            {collection.slice(0, visibleCount).map((category) => (
                                <div
                                    key={category.id}
                                    className="flex flex-col items-center border border-btn rounded-md overflow-hidden shadow-lg div-body"
                                >
                                    <Link href={`/categories/collections/${category.id}/${encodeURIComponent(category.slug)}`}>

                                        <img
                                            src={category.collection_image}
                                            alt={category.title}
                                            className="w-full h-56 object-cover"
                                        /></Link>
                                    <p className="text-lg font-semibold text-center p-4">{category.title}</p>
                                </div>
                            ))}
                        </div>
                        {visibleCount < collection.length && (
                            <div className="text-center my-4">
                                <button
                                    onClick={handleShowMore}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>No collection found</p>
                )}
            </div>
        </>
    );
};

export default Collection;
