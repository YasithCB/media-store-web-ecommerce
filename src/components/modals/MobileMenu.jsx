import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Award, Blocks, Briefcase, RefreshCcw, Key, Sparkles, Clapperboard, Store, Printer, Headphones, Search, UserSearch, MapPinHouse  } from "lucide-react";

import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";

import {
    blogMenuItems,
    demoItems,
    othersPages,
    shopPages,
} from "@/data/menu";

export default function MobileMenu() {
    const { pathname } = useLocation();

    const isMenuActive = (link) => {
        return link.href?.split("/")[1] === pathname.split("/")[1];
    };

    const isMenuParentActive = (menu) => {
        return menu.some((elm) => isMenuActive(elm));
    };

    const isMenuParentActive2 = (menu) => {
        return menu.some((elm) => isMenuParentActive(elm.items));
    };

    return (
        <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
          className="icon-close btn-close-mb link"
          data-bs-dismiss="offcanvas"
      />

            {/* Logo Section */}
            <div className="text-center my-4">
                <Link to={`/`}>
                    <img alt="Logo" src="/images/logo/logo.webp" width={100} />
                </Link>
            </div>

            <div className="mb-canvas-content">
                <div className="mb-body">
                    <div className="flat-animate-tab">

                        {/* Tabs Navigation */}
                        <div className="flat-title-tab-nav-mobile">
                            <ul className="menu-tab-line" role="tablist">
                                <li className="nav-tab-item" role="presentation">
                                    <a
                                        href="#main-menu"
                                        className="tab-link link fw-semibold active"
                                        data-bs-toggle="tab"
                                    >
                                        Menu
                                    </a>
                                </li>
                                <li className="br-line type-vertical bg-line h23" />
                                <li className="nav-tab-item" role="presentation">
                                    <a
                                        href="#category"
                                        className="tab-link link fw-semibold"
                                        data-bs-toggle="tab"
                                    >
                                        Categories
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Tabs Content */}
                        <div className="tab-content">

                            {/* Main Menu Tab */}
                            <div className="tab-pane active show" id="main-menu" role="tabpanel">
                                <div className="mb-content-top">

                                    {/* Search Form */}
                                    <form action="#" className="form-search mb-3">
                                        <fieldset>
                                            <input
                                                className=""
                                                type="text"
                                                placeholder="Search for anything"
                                                name="text"
                                                tabIndex={2}
                                                required
                                            />
                                        </fieldset>
                                        <button type="submit" className="button-submit">
                                            <i className="icon-search" />
                                        </button>
                                    </form>

                                    {/* Navigation Items */}
                                    <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                                        <li
                                            className={`nav-mb-item ${isMenuParentActive(demoItems) ? "active" : ""}`}
                                        >
                                            <a
                                                href="/"
                                                className="collapsed mb-menu-link"
                                                data-bs-toggle="collapse"
                                                aria-expanded="true"
                                                aria-controls="dropdown-menu-home"
                                            >
                                                <span>Home</span>
                                            </a>
                                        </li>

                                        <li
                                            className={`nav-mb-item ${isMenuParentActive2(shopPages) ? "active" : ""}`}
                                        >
                                            <a
                                                href="/shop-fullwidth"
                                                className="collapsed mb-menu-link"
                                                data-bs-toggle="collapse"
                                                aria-expanded="true"
                                                aria-controls="dropdown-menu-shop"
                                            >
                                                <span>Shop</span>
                                            </a>
                                        </li>

                                        <li
                                            className={`nav-mb-item ${isMenuParentActive(blogMenuItems) ? "active" : ""}`}
                                        >
                                            <a
                                                href="/blog-grid"
                                                className="collapsed mb-menu-link"
                                                data-bs-toggle="collapse"
                                                aria-expanded="true"
                                                aria-controls="dropdown-menu-blog"
                                            >
                                                <span>Blog</span>
                                            </a>
                                        </li>

                                        <li
                                            className={`nav-mb-item ${isMenuParentActive(othersPages) ? "active" : ""}`}
                                        >
                                            <a
                                                href="/about"
                                                className="collapsed mb-menu-link"
                                                data-bs-toggle="collapse"
                                                aria-expanded="true"
                                                aria-controls="dropdown-menu-page"
                                            >
                                                <span>About</span>
                                            </a>
                                        </li>

                                        <li
                                            className={`nav-mb-item ${isMenuParentActive(othersPages) ? "active" : ""}`}
                                        >
                                            <a
                                                href="/contact"
                                                className="collapsed mb-menu-link"
                                                data-bs-toggle="collapse"
                                                aria-expanded="true"
                                                aria-controls="dropdown-menu-page"
                                            >
                                                <span>Contact</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Contact Info */}
                                <div className="mb-other-content mt-4">
                                    <ul className="mb-info list-unstyled p-0 m-0">

                                        <li className="d-flex align-items-start mb-3">
                                          <span className="me-2">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                                                  fill="#333E48"
                                              />
                                            </svg>
                                          </span>
                                            <p className="mb-0 d-flex flex-column">
                                                <strong>Address:</strong>{" "}
                                                <a
                                                    target="_blank"
                                                    href="https://www.google.com/maps?q=8500LoremStreetChicago,IL55030Dolorsitamet"
                                                    className="text-decoration-none fw-medium"
                                                >
                                                    Airport Road, Abu Dhabi, UAE
                                                </a>
                                            </p>
                                        </li>

                                        <li className="d-flex align-items-start mb-3">
                                              <span className="me-2">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.83.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.33.26 2.63.74 3.83a1 1 0 01-.21 1.11l-2.2 2.2z"
                                                      fill="#333E48"
                                                  />
                                                </svg>
                                              </span>
                                            <p className="mb-0 d-flex flex-column">
                                                <strong>Phone:</strong>{" "}
                                                <a href="tel:+971502303130" className="text-decoration-none fw-medium">
                                                    +971 50 2 30 31 30
                                                </a>
                                            </p>
                                        </li>

                                        <li className="d-flex align-items-start">
                                          <span className="me-2">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                  d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                                                  fill="#333E48"
                                              />
                                            </svg>
                                          </span>
                                            <p className="mb-0 d-flex flex-column">
                                                <strong>Email:</strong>{" "}
                                                <a href="mailto:info@mediastore.com" className="text-decoration-none fw-medium">
                                                    info@mediastore.com
                                                </a>
                                            </p>
                                        </li>

                                    </ul>
                                </div>

                            </div>

                            {/* Categories Tab */}
                            <div className="tab-pane" id="category" role="tabpanel">
                                <div className="mb-content-top">
                                    <ul className="nav-ul-mb">
                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/top-dealers/Top Dealers"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Award size={20} className="me-2" />
                                                <span>Top Dealers</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/equipments/Equipments & Machinery"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Blocks size={20} className="me-2" />
                                                <span>Equipments & Machinery</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/all-jobs/All Jobs"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Briefcase size={20} className="me-2" />
                                                <span>All Jobs</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/used-items/Used Items"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <RefreshCcw size={20} className="me-2" />
                                                <span>Used Items</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/rent-items/Rent Items"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Key size={20} className="me-2" />
                                                <span>Rent Items</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/brand-new-items/Brand New Items"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Sparkles size={20} className="me-2" />
                                                <span>Brand New Items</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/video-camera/Video & Camera Equipments"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Clapperboard size={20} className="me-2" />
                                                <span>Video & Camera Equipments</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/audio-sound/Audio & Sound Equipments"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Headphones size={20} className="me-2" />
                                                <span>Audio & Sound Equipments</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/printing-machinery/Printing Machinery"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Printer size={20} className="me-2" />
                                                <span>Printing Machinery</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/job-seeking/Job Seeking"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Search size={20} className="me-2" />
                                                <span>Job Seeking</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/job-hiring/Job Hiring"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <UserSearch size={20} className="me-2" />
                                                <span>Job Hiring</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/companies-directory/Companies Directory"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <MapPinHouse size={20} className="me-2" />
                                                <span>Companies Directory</span>
                                            </a>
                                        </li>

                                        <li className="nav-mb-item">
                                            <a
                                                href="/shop/service-providers/Service Providers"
                                                className="mb-menu-link d-flex align-items-center"
                                            >
                                                <Store size={20} className="me-2" />
                                                <span>Service Providers</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mb-bottom mt-4">
                    <div className="bottom-bar-language bar-lang d-flex justify-content-between">
                        <div className="tf-curs">
                            <CurrencySelect />
                        </div>
                        <div className="tf-lans">
                            <LanguageSelect parentClassName="image-select center style-default type-lan" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
