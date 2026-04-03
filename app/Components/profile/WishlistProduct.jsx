'use client';

import React, { useState, useEffect } from 'react';
import { deleteWishlistItem, getWishlist } from '@/app/Service/Profile';
import { removeAllWishlists } from '@/app/helper/ProfileUtils';
import CustomCollectionCard from '@/app/Common/CustomCollectionCard';
import EmptyCart from '../card/EmptyCart';
import CustomTypography from '@/app/Custom/CustomTypography';
import ClientLink from '@/app/Common/ClientClick';
import { Trash2 } from 'lucide-react';

const WishlistItem = ({ userId, activeTab }) => {
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist(page, 6)
      console.log(res.wishlists)
      setWishlist(res?.wishlists || []);
      if (res?.totalPages) {
        setTotalPages(res.totalPages);
      }

    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId, page]);

  useEffect(() => {
    if (activeTab === 1) {
      setPage(1);
    }
  }, [activeTab]);

  const handleDeleteWishlist = async (productId) => {
    await deleteWishlistItem(productId);
    fetchWishlist();
  };

  const handleRemoveAll = async () => {
    await removeAllWishlists(userId, setWishlist);
    fetchWishlist();
  };

  return (
    <div className="mt-4">
      {wishlist && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRemoveAll}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Remove All
          </button>
        </div>
      )}

      {wishlist ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map((wishlistItem) => (
            <div
              key={wishlistItem._id}
              className="relative rounded-xl shadow-md transition-transform duration-300 hover:scale-105 bg-white"
            >
              <button
                onClick={() => handleDeleteWishlist(wishlistItem._id)}
                className="absolute top-2 right-2 z-10 bg-white text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={16} />
              </button>

              <ClientLink
                href={`/product/${wishlistItem._id}/${encodeURIComponent(
                  wishlistItem.slug
                )}`}
                passHref
              >
                <CustomCollectionCard
                  id={wishlistItem._id}
                  image={wishlistItem.detail_image?.[0]}
                  title={wishlistItem.name}
                  tooltip={wishlistItem.name}
                  slug={wishlistItem.slug}
                />
              </ClientLink>
            </div>
          ))}
        </div>
      ) : (
        <EmptyCart
          src="/search-not-found.png"
          title="Your wishlist is empty"
          subtitle="Looks like you haven’t added anything to your wishlist yet."
          buttonText="Browse Products"
          buttonHref="/"
        />
      )}

      {wishlist.length > 0 && (
        <div className="flex justify-between items-center mt-6 text-tsecondary">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <CustomTypography variant="body2">
            Page {page} of {totalPages}
          </CustomTypography>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistItem;
