import React from 'react';

const Heading = ({ text ,className}) => {
    return (
        <div className="mb-4">
            <h2 className={`text-2xl font-bold text-left${className}`}>{text}</h2>
        </div>
    );
};

export default Heading;
