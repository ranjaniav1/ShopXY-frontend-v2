import React from 'react';

const ProductCard = ({ imgSrc, title, price, discountPrice, rating, description, offer, className,onClick }) => {
    return (
        <div className="border div-body border-gray-200 hover:scale-105 transition-transform transform rounded-lg overflow-hidden shadow-md p-4 hover:border-green-500 hover:shadow-green-200" onClick={onClick}>
            <img
                src={imgSrc}
                alt={title}
                // className="w-full h-60 object-contain" 
                className={className}
            />
            <div >
                <h3 className="text-xl font-semibold mb-2 truncate">{title}</h3>
                <div className="mb-2">
                    {discountPrice ? (
                        <div className="flex items-baseline">
                            <p className="text-green-500 font-bold text-lg">₹{discountPrice}</p>
                            <p className="text-red-500 font-bold text-lg mr-2 line-through">₹{price}</p><p className="text-blue-500 text-sm mb-2">{offer}%off</p>
                        </div>
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
