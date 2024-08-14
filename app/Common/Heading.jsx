import React from 'react';

const Heading = ({ text ,className}) => {
    return (
        <div >
            <h2 className={` font-bold text-left${className} text-2xl my-5 btn p-4 rounded-md `}>{text}</h2>
        </div>
    );
};

export default Heading;
