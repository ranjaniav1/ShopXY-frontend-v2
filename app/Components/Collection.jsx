'use client'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetCategories } from '../Service/GetCategory'

const Collection = () => {
    const [collection, setcollection] = useState([])
    async function GetCollection() {
        try {

            const result = await GetCategories();
            console.log("catcollectione", result.collection)
            setcollection(result.collection)
        } catch (error) {
            console.log("failed to fetch collection", error)
        }
    }

    useEffect(() => {
        GetCollection()
    }, [])
    return (
        <div className='my-4'>
            <Container maxWidth="xl" className="bg-white">
                {collection && collection.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9  px-10 py-4">
                        {collection.slice(9, 27).map((category) => (
                            < div
                                key={category.id}

                            >
                                <img
                                    src={category.collection_image}
                                    alt={category.title}
                                    className="w-24 h-24  object-cover"
                                />
                                <p className="text-lg font-semibold">{category.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No collection found</p>
                )
                }
            </Container >
        </div >
    )
}

export default Collection
