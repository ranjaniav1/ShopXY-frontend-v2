'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CustomSkeleton from '@/app/Common/CustomSkeleton';
import { GetSingleCollection } from '@/app/Service/GetCollection';
import Link from 'next/link';
import Heading from '@/app/Common/Heading';

const Page = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 
    const { title } = useParams(); 

    async function fetchCategory() {
        try {
            const result = await GetSingleCollection({ collection_id: id });
            console.log("collections", result.data);
            setCategories(result.data);
        } catch (error) {
            console.log("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    const skeletonCount = 9;

    return (
        <div className="my-7 px-4 py-5 rounded-md bg-gray-100 div-body">
            <Heading text={title}  />
            {loading ? (
                <div className="p-4 flex flex-wrap gap-4 justify-center">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <CustomSkeleton
                            key={index}
                            type="card"
                            width="96px"
                            height="96px"
                            className="bg-gray-300"
                        />
                    ))}
                </div>
            ) : categories && categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   ">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center border hover:border-btn rounded-md overflow-hidden shadow-lg transition-opacity duration-300 hover:opacity-80 hover:border-green-500  hover:text-[#3a6927]"
                        >

                            <Link href={`/categories/collections/${category.id}/${category.slug}`}>
                                <img
                                    src={category.collection_image}
                                    alt={category.title}
                                    className="w-full h-56 object-cover hover:scale-110"
                                />
                            </Link>
                            <div className="p-4">
                                <p className="text-lg font-semibold text-center ">{category.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No categories found</p>
            )}
        </div>
    );
};

export default Page;
