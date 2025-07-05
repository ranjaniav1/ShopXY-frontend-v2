'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import CustomSkeleton from '@/app/Custom/CustomSkeleton';

import Heading from '@/app/Common/Heading';
import ProductCard from '@/app/Components/ProductCard';
import { useUser } from '@/app/context/UserContext';
import { getWishlist } from '@/app/Service/Profile';
import { GetFilteredProduct } from '@/app/Service/GetProduct';
import EmptyCart from '@/app/Components/EmptyCart';
import ClientLink from '@/app/Common/ClientClick';

const Page = () => {
    const { slug } = useParams();
    const pathname = usePathname();
    const { user } = useUser(); // 👈 Get user from context
    const userId = user?._id;

    const segments = pathname?.split('/').filter(Boolean);
    const type = segments?.[0];

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        if (!type) return;
        (async () => {
            try {
                const data = await GetFilteredProduct({ type: "product", search: slug });
                console.log(data)
                setProducts(data.filters || []);
            } catch (err) {
                console.error(`❌ Failed to fetch ${type}`, err);
            } finally {
                setLoading(false);
            }
        })();
    }, [type, slug]);

    const fetchWishlist = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await getWishlist(userId);
            console.log("wish res", response)
            const wishlistIds = response?.products?.map(item => item.product._id) || [];
            console.log("wish resndjs", wishlistIds)

            setWishlist(wishlistIds);
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
            setWishlist([]); // fallback to empty array
        }
    }, [userId]);


    useEffect(() => {
        if (userId) fetchWishlist();
    }, [userId, fetchWishlist]);

    const isInWishlist = (id) => wishlist.includes(id);


    return (
        <div>
            <Heading text={slug} />
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                    {Array.from({ length: products.length || 9 }).map((_, index) => (
                        <div key={index} className="w-full">
                            <CustomSkeleton type="card" />
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <EmptyCart
                    title="No products found"
                    subtitle="We couldn't find any products matching this category or brand. Try exploring other collections!"
                    buttonHref="/"
                    buttonText="Explore Products"
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ClientLink key={product._id} href={`/product/${product._id}/${encodeURIComponent(product.slug)}`} passHref>
                            <ProductCard
                                className="h-40 w-full"
                                imgSrc={product.detail_image[0]}
                                title={product.name}
                                price={product.actual_price}
                                discountPrice={product.discounted_price}
                                rating={product.ratings}
                                description={product.description}
                                offer={product.offer}
                                userId={userId}
                                productId={product._id}
                                slug={product.slug}
                                isInWishlist={isInWishlist(product._id)}
                                inStock={!!product.stock_qty && Number(product.stock_qty) > 0}
                                stockQty={product.stock_qty}
                                brand={product.brand}
                                collection={product.collection}
                                shipping_charges={product.shipping_charges}
                                color={product.color}
                                size={product.size}
                            />
                        </ClientLink>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Page;
// : (
//                 <CustomTypography className="text-center text-gray-600">No categories found</CustomTypography>
//             )