import React from 'react';

const ProductDetailInfo = ({ title, details }) => {
    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 div-body">
            <h3 className="text-gray-700 text-lg font-semibold mb-2">{title}</h3>
            <ul className="list-disc list-inside space-y-1">
                {details.map((detail, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetailInfo;
