"use client"
import React, { useEffect, useState } from 'react'
import { GetCategories } from '../Service/GetCategory'
import Heading from '../Common/Heading'
import ClientLink from '../Common/ClientClick'
import { t } from 'i18next'
import CustomTypography from '../Custom/CustomTypography'

const page = () => {
    const [cat, setCat] = useState([])
    async function GetAllCat() {
        const res = await GetCategories();
        console.log(res)
        setCat(res.categories)
    }
    useEffect(() => { GetAllCat() }, [])
    return (
        <div className="bg-secondary py-12">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Heading */}
                <Heading title={t("Shop by Category")} subtitle={t("Discover our extensive range of products across all your favorite categories")} />


                {cat.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {cat.map((col) => (
                            <ClientLink
                                key={col._id}
                                href={`/collection/${col.slug}`}
                                className="group bg-body rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 flex flex-col h-64"
                            >
                                {/* Image with fixed height and responsive scaling */}
                                <div className="w-full h-48 p-4 overflow-hidden">
                                    <img
                                        src={col.category_icon}
                                        alt={col.title}
                                        className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content vertically centered */}
                                <div className="flex flex-col justify-center items-center px-3 py-2 text-center flex-grow">
                                    <h3 className="text-base font-semibold text-tprimary">
                                        {col.title}
                                    </h3>
                                    <p className="text-sm text-tsecondary">
                                        {col.subtitle || t("Explore now")}
                                    </p>
                                </div>
                            </ClientLink>
                        ))}
                    </div>
                ) : (
                    <CustomTypography textAlign="center" className="text-tsecondary mt-4">
                        {t("No Categories found")}
                    </CustomTypography>
                )}
            </div>
        </div>
    )
}

export default page
