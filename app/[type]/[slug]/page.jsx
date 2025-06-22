'use client';
import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Grid } from '@mui/material';
import CustomBox from '@/app/Custom/CustomBox';
import CustomSkeleton from '@/app/Custom/CustomSkeleton';
import Link from 'next/link';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import Heading from '@/app/Common/Heading';
import CustomTypography from '@/app/Custom/CustomTypography';
import ProductCard from '@/app/Components/ProductCard';
import { useUser } from '@/app/context/UserContext';
import { getWishlist } from '@/app/Service/Profile';
import { GetFilteredProduct } from '@/app/Service/GetProduct';
import EmptyCart from '@/app/Components/EmptyCart';

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
        if ( !type) return;
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
    }, [ type]);

    const fetchWishlist = async () => {
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
    };


    useEffect(() => {
        if (userId) fetchWishlist();
    }, [userId]);

    const isInWishlist = (id) => wishlist.includes(id);


    return (
        <CustomBox>
            <Heading text={slug} />
            {loading ? (
                <Grid container spacing={2} className="p-4">
                    {Array.from({ length: products.length || 9 }).map((_, index) => (
                        <Grid item xs={6} sm={4} md={5} lg={3} key={index}>
                            <CustomSkeleton type="card" />
                        </Grid>
                    ))}
                </Grid>
            ) : products.length === 0 ? (
                <EmptyCart
                    title="No products found"
                    subtitle="We couldn't find any products matching this category or brand. Try exploring other collections!"
                    buttonHref="/"
                    buttonText="Explore Products"
                />
            ) : (
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={product._id}>
                            <Link href={`/product/${product._id}/${encodeURIComponent(product.slug)}`} passHref>
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
                                    inStock={product.inStock > 0}
                                />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}

        </CustomBox>
    );
};

export default Page;
// : (
//                 <CustomTypography className="text-center text-gray-600">No categories found</CustomTypography>
//             )