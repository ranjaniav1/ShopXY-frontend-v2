import { useTheme } from '@mui/material';
import React from 'react';

const ProductCard = ({ imgSrc, title, price, discountPrice, rating, description, offer, className, onClick }) => {
    const theme = useTheme();

    return (
        <div
            className="relative border border-gray-200  rounded-lg overflow-hidden shadow-md p-4  box"
            onClick={onClick}
            style={{
                background: theme.palette.card.background,
                border: `1px solid ${theme.palette.card.border}`,
            }}
        >
            {/* Ribbon-style offer display in the top right corner */}
            {offer && (
                <div className="">
                    <div className="ribbon ribbon-top-right">
                        <span>
                            {offer}% OFF
                        </span>
                    </div>
                </div>
            )}

            <img
                src={imgSrc}
                alt={title}
                className={className}
            />
            <div>
                <h3 className="text-xl font-semibold mb-2 truncate">{title}</h3>
                <div className="mb-2">
                    {discountPrice ? (
                        <>
                            <div className="flex justify-between items-baseline">
                                <p className="text-red-500 font-bold text-lg line-through">₹{price}</p>
                                <p className="text-green-500 font-bold text-lg">₹{discountPrice}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-green-500 font-bold text-lg">{price}</p>
                    )}
                </div>
                {rating && (
                    <div className="flex items-center mb-2">
                        <span className="text-yellow-500">{'★'.repeat(rating)}</span>
                        <span className="text-gray-500 ml-1">({rating})</span>
                    </div>
                )}
                {description && <p className="text-gray-700 text-sm">{description}</p>}
            </div>
        </div>
    );
};

export default ProductCard;
