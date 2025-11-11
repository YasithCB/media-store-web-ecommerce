import React from "react";
import { Link, useLocation } from "react-router-dom";
const navItems = [
  { label: "Account Details", href: "/my-account", isActive: true },
  { label: "Address", href: "/my-account-address" },
  { label: "Orders", href: "/my-account-orders" },
  { label: "Wishlist", href: "/wishlist" },
];
export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <>
      {" "}
      {navItems.map((item, index) => (
        <li key={index}>
          {pathname === item.href ? (
            <span className="my-account-nav-item active">{item.label}</span>
          ) : (
            <Link to={item.href} className="my-account-nav-item">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
