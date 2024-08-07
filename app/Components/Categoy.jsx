'use client'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetCategories } from '../Service/GetCategory'

const Categoy = () => {
    const [categories, setCategories] = useState([])
    async function GetCategory() {
        try {

            const result = await GetCategories();
            console.log("cate", result)
            setCategories(result.category)
        } catch (error) {
            console.log("failed to fetch categories", error)
        }
    }

    useEffect(() => { GetCategory() }, [])
    return (
        <div className='my-4'>
            <Container maxWidth="xl" className="bg-white">
                {categories && categories.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-20 px-10 py-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}

                            >
                                <img
                                    src={category.category_icon}
                                    alt={category.title}
                                    className="w-24 h-24 rounded-full object-cover mb-2"
                                />
                                <p className="text-lg font-semibold">{category.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No categories found</p>
                )}
            </Container>
        </div>
    )
}

export default Categoy
