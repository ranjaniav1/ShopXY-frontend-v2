'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Grid } from '@mui/material';
import CustomBox from '@/app/Custom/CustomBox';
import CustomSkeleton from '@/app/Custom/CustomSkeleton';
import Link from 'next/link';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import Heading from '@/app/Common/Heading';
import CustomTypography from '@/app/Custom/CustomTypography';
import { GetProductByCatId } from '@/app/Service/GetProduct';
import ProductCard from '@/app/Components/ProductCard';
import { useUser } from '@/app/context/UserContext';
import { getWishlist } from '@/app/Service/Profile';

const Page = () => {
    const params = useParams();
    const categoryId = params?.categoryId;
    const slug = params?.slug;
    const { user } = useUser(); // 👈 Get user from context
    const userId = user?._id;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([])

    async function fetchCategory() {
        try {
            const result = await GetProductByCatId({ categoryId });
            console.log("collections", result);
            setCategories(result?.products);
        } catch (error) {
            console.log("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);
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
    useEffect(() => {
        AOS.init({
            duration: 600, // Animation duration
            easing: 'ease-in-out', // Animation easing
            once: true, // Whether animation should happen only once
        });
    }, []);

    return (
        <CustomBox>
            <Heading text={slug} />
            {loading ? (
                <Grid container spacing={2} className="p-4">
                    {Array.from({ length: categories.length || 9 }).map((_, index) => (
                        <Grid item xs={6} sm={4} md={5} lg={3} key={index}>
                            <CustomSkeleton type="card" />
                        </Grid>
                    ))}
                </Grid>
            ) : categories && categories.length > 0 ? (
                <Grid container spacing={2}>
                    {categories.map((product) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={product._id} data-aos="fade-up">
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
            ) : (
                <CustomTypography className="text-center text-gray-600">No categories found</CustomTypography>
            )}
        </CustomBox>
    );
};

export default Page;
