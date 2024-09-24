import { useTheme } from '@mui/material';
import React from 'react';

const ProductCard = ({ imgSrc, title, price, discountPrice, rating, description, offer, className, onClick }) => {
    const theme = useTheme();

    // Function to truncate the description to 8 words
    const truncateDescription = (description, wordCount) => {
        if (!description) return '';

        const words = description.split(' ');
        if (words.length <= wordCount) return description;

        return words.slice(0, wordCount).join(' ') + '...';
    };

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="flex items-center">
                {'★'.repeat(fullStars)}
                {halfStar ? '☆' : ''}
                {'☆'.repeat(emptyStars)}
            </div>
        );
    };

    return (
        <div
            className="relative border border-gray-200 rounded-lg overflow-hidden shadow-md p-2 cursor-pointer"
            onClick={onClick}
            style={{
                background: theme.palette.card.background,
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
                <h3 className="text-sm font-bold truncate">{title}</h3>
                <div className="mb-2">
                    {discountPrice ? (
                        <>
                            <div className="flex justify-between items-baseline">
                                <p className="text-red-500 font-bold text-sm line-through">₹{price}</p>
                                <p className="text-green-500 font-bold text-sm">₹{discountPrice}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-green-500 font-bold text-lg">{price}</p>
                    )}
                </div>
                {rating && (
                    <div className="flex items-center mb-2">
                        {renderStars(rating)}
                        <span className="text-gray-500 ml-1">({rating.toFixed(1)})</span>
                    </div>
                )}
                {description && <p className="text-gray-500 text-sm">{truncateDescription(description, 4)}</p>}
            </div>
        </div>
    );
};

export default ProductCard;
