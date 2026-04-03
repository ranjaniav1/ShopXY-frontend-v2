"use client";
import React, { useEffect, useState } from "react";
import ClientLink from "@/app/Common/ClientClick";
import { t } from "i18next";
import CustomTypography from "@/app/Custom/CustomTypography";
import Pagination from "@/app/Common/Paginations";
import { GetFilteredProduct } from "@/app/Service/GetProduct";
import { useParams } from "next/navigation";
import Heading from "@/app/Common/Heading";
import CardCollection from "@/app/Components/card/CollectionCard";

const Page = () => {
    const { type } = useParams();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const fetchData = async (page = 1) => {
        try {
            const params = {
                type: type || "product",
                page,
                limit: itemsPerPage,
            };

            const res = await GetFilteredProduct(params);

            // Adjust according to backend structure
            setData(res?.filters || res || []);
            setTotalItems(res?.total || res?.totalItems || 0);
            setCurrentPage(page);
        } catch (error) {
            console.error(`❌ Failed to fetch ${type}:`, error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [type, currentPage]);
    const headings = {
        category: {
            title: "Shop by Category",
            subtitle:
                "Discover our extensive range of products across all your favorite categories",
        },
        collection: {
            title: "Top Collections",
            subtitle: "Curated collections for every lifestyle",
        },
        brand: {
            title: "Shop by Brand",
            subtitle: "Find your favorite brands and explore their collections",
        },
    };

    const { title, subtitle } = headings[type]
    return (
        <div className="bg-secondary py-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <Heading title={t(title)} subtitle={t(subtitle)} />

                {data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {data.map((item) => (
                                <CardCollection key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={fetchData}
                        />
                    </>
                ) : (
                    <CustomTypography textAlign="center" className="text-tsecondary mt-4">
                        {t(`No ${type}s found`)}
                    </CustomTypography>
                )}
            </div>
        </div>
    );
};

export default Page;
