'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetSingleProduct } from '@/app/Service/GetProduct';
import ProductGallery from '@/app/Components/ProductGallery';
import ProductDetails from '@/app/Components/ProductDetails';
import CustomTypography from '@/app/Custom/CustomTypography';

const Page = () => {
  const params = useParams();
  const productId = params?.productId;
  const productTitle = params?.productTitle;

  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProduct();
  }, [productTitle]);

useEffect(() => {
  if (slug) {
    document.title = `${productTitle} | ShopXY`;
  }
}, [slug]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };
  
  if (loading) {
    return <CustomTypography variant="h6">Loading...</CustomTypography>;
  }




  return (

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left side: Image gallery */}
      <div className="lg:col-span-5">
        <ProductGallery
          detailImages={product?.detail_image || []}
          selectedImage={selectedImage}
          onImageClick={handleImageClick}
          productName={product.name}
          productId={product._id}
          stockQty={product.stock_qty}
        />
      </div>

      {/* Right side: Product details */}
      <div className="lg:col-span-7">
        <ProductDetails
          name={product.name}
          actual_price={product.actual_price}
          discounted_price={product.discounted_price}
          offer={product.offer}
          description={product.description}
          full_description={product.full_description}
          special_offer={product.special_offer}
          gst_type={product.gst_type}
          productId={product._id}
          brand={product.brand}
          size={product.size}
          color={product.color}
          stock_qty={product.stock_qty}
          shipping_charges={product.shipping_charges}
          ratings={product.ratings}
          reviews={product.reviews}
          category={product.category}
          collection={product.collection}
        />
      </div>
    </div>
  );
};

export default Page;
