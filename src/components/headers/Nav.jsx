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
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  const isMenuParentActive2 = (menu) => {
    return menu.some((elm) => isMenuParentActive(elm.items));
  };

  return (
    <>
      <li
        className={`nav-item ${
          isMenuParentActive(demoItems) ? "active" : ""
        }  pst-unset`}
      >
        <a href="/" className="item-link link body-md-2 fw-semibold">
          <span>Home</span>
        </a>
      </li>

      <li
        className={`nav-item ${isMenuParentActive2(shopPages) ? "active" : ""}`}
      >
        <a href="/shop-fullwidth" className="item-link link body-md-2 fw-semibold">
          <span>Shop</span>
        </a>
      </li>

      <li
        className={`nav-item ${
          isMenuParentActive(blogMenuItems) ? "active" : ""
        }`}
      >
        <a href="/blog-grid" className="item-link link body-md-2 fw-semibold">
          <span>Blog</span>
        </a>
      </li>
        <li
            className={`nav-item ${
                isMenuParentActive(blogMenuItems) ? "active" : ""
            }`}
        >
            <a href="/about" className="item-link link body-md-2 fw-semibold">
                <span>About</span>
            </a>
        </li>
        <li
            className={`nav-item ${
                isMenuParentActive(blogMenuItems) ? "active" : ""
            }`}
        >
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
