import React from 'react';

const Heading = ({ text ,className}) => {
    return (
        <div >
            <h2 className={` font-bold text-left${className} text-xl my-5 btn p-3 rounded-md `}>{text}</h2>
        </div>
    );
};

export default Heading;
