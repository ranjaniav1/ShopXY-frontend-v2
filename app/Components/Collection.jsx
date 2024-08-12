'use client';
import React, { useEffect, useState } from 'react';
import { GetCategories } from '../Service/GetCategory';
import Heading from '../Common/Heading';

const Collection = () => {
    const [collection, setcollection] = useState([]);
    
    async function GetCollection() {
        try {
            const result = await GetCategories();
            console.log("catcollectione", result.collection);
            setcollection(result.collection);
        } catch (error) {
            console.log("failed to fetch collection", error);
        }
    }

    useEffect(() => {
        GetCollection();
    }, []);

    return (
        <>
            <Heading text="Best Deals on Electronics" />
            <div className='my-4 '>
                {collection && collection.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4 py-4 gap-6">
                        {collection.slice(1, 7).map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col items-center border border-btn rounded-md overflow-hidden shadow-lg bg-white"
                            >
                                <img
                                    src={category.collection_image}
                                    alt={category.title}
                                    className="w-full h-56 object-cover"
                                />
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

export default Collection;
