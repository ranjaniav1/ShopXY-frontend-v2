// components/Common/ClientLink.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ClientLink = ({ href, className = "", children, ...rest }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`cursor-pointer ${className}`}
            {...rest}
        >
            {children}
        </Link>
    );
};

export default ClientLink;
