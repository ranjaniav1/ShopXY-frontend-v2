"use client";
import Link from "next/link";

const ClientLink = ({ href, className = "", children, ...rest }) => {
  return (
    <Link href={href} className={`group cursor-pointer ${className}`} {...rest}>
      {children}
    </Link>
  );
};

export default ClientLink;
