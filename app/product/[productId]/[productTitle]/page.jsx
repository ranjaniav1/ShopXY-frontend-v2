'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetSingleProduct } from '@/app/Service/GetProduct';
import ProductGallery from '@/app/Components/ProductGallery';
import ProductDetails from '@/app/Components/ProductDetails';
import CustomBox from '@/app/Custom/CustomBox';
import CustomTypography from '@/app/Custom/CustomTypography';

const Page = () => {
  const params = useParams();
  const productId = params?.productId;
  const productTitle = params?.productTitle;

  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    if (!productTitle) return;
    try {
      const result = await GetSingleProduct({ slug: productTitle });
      const productData = result.product;

      setProduct(productData);
      setBrand(result.brand);
      if (productData) {
        setSelectedImage(productData.detail_image[0]);
      }
    } catch (error) {
      console.error('Failed to fetch product', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return <CustomTypography variant="h6">Loading...</CustomTypography>;
  }

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  return (
    <CustomBox>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left side: Image gallery */}
        <div className="md:col-span-4">
          <ProductGallery
            detailImages={product?.detail_image || []}
            selectedImage={selectedImage}
            onImageClick={handleImageClick}
            productName={product.name}
            productId={product._id}
          />
        </div>

        {/* Right side: Product details */}
        <div className="md:col-span-8">
          <ProductDetails
            name={product.name}
            actual_price={product.actual_price}
            discounted_price={product.discounted_price}
            offer={product.offer}
            ratings={product.ratings}
            special_offer={product.special_offer}
            reviews={product.reviews}
            description={product.description}
            full_description={product.full_description}
            productId={product._id}
            size={product.size}
            tags={product.tags}
            gst_type={product.gst_type}
            brand={product.brand}
            product_id={product._id}
            product={product}
          />
        </div>
      </div>
    </CustomBox>
  );
};

export default Page;
