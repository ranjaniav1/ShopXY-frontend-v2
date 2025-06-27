// components/Common/ClientLink.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/context/LoadingContext"; // adjust path

const ClientLink = ({ href, className = "", children, ...rest }) => {
    const router = useRouter();
    const { setLoading } = useLoading();

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
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
