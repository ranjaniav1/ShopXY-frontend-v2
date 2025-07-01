// components/Common/ClientLink.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ClientLink = ({ href, className = "", children, ...rest }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={`cursor-pointer ${className}`}
            {...rest}
        >
            {children}
        </a>
    );
};

export default ClientLink;
