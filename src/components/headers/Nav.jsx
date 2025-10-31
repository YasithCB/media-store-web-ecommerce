import React from "react";

import { Link, useLocation } from "react-router-dom";
import {
  blogMenuItems,
  demoItems,
  othersPages,
  shopDetailsPages,
  shopPages,
} from "@/data/menu";

export default function Nav() {
  const { pathname } = useLocation();

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

  return (
    <>
      <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
        <a href="/" className="item-link link body-md-2 fw-semibold">
          <span>Home</span>
        </a>
      </li>

      <li className={`nav-item ${isActive("/shop-fullwidth") ? "active" : ""}`}>
        <a href="/shop-fullwidth" className="item-link link body-md-2 fw-semibold">
          <span>Shop</span>
        </a>
      </li>

        <li className={`nav-item ${isActive("/blog-grid") ? "active" : ""}`}>
        <a href="/blog-grid" className="item-link link body-md-2 fw-semibold">
          <span>Blog</span>
        </a>
      </li>
        <li className={`nav-item ${isActive("/about") ? "active" : ""}`}>
            <a href="/about" className="item-link link body-md-2 fw-semibold">
                <span>About</span>
            </a>
        </li>
        <li className={`nav-item ${isActive("/contact") ? "active" : ""}`}>
            <a href="/contact" className="item-link link body-md-2 fw-semibold">
                <span>Contact</span>
            </a>
        </li>


      {/*<li*/}
      {/*  className={`nav-item relative ${*/}
      {/*    isMenuParentActive(othersPages) ? "active" : ""*/}
      {/*  }`}*/}
      {/*>*/}
      {/*  <a href="#" className="item-link link body-md-2 fw-semibold">*/}
      {/*    <span>Page</span>*/}
      {/*    <i className="icon icon-arrow-down" />*/}
      {/*  </a>*/}
      {/*  <div className="sub-menu-container">*/}
      {/*    <ul className="sub-menu-list">*/}
      {/*      {othersPages.map((item) => (*/}
      {/*        <li*/}
      {/*          key={item.id}*/}
      {/*          className={` ${isMenuActive(item) ? "active" : ""}`}*/}
      {/*        >*/}
      {/*          <Link to={item.href} className="body-md-2 link">*/}
      {/*            <span>{item.text}</span>*/}
      {/*          </Link>*/}
      {/*        </li>*/}
      {/*      ))}*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*</li>*/}
    </>
  );
}
