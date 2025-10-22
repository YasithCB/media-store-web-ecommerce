import React, { useEffect, useRef, useState } from "react";
import { Award, Blocks, Briefcase, RefreshCcw, Key, Sparkles, Clapperboard, Store, Printer, Headphones, Search, UserSearch, MapPinHouse  } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavCategories({ styleClass = "" }) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const navRef = useRef(null);
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={navRef} className={`nav-category-wrap ${styleClass}`}>
      <div
        onClick={() => setActiveDropdown((pre) => !pre)}
        className={`nav-title btn-active ${activeDropdown ? "active" : ""} `}
      >
        <i className="icon-menu-dots text-cl-1 fs-20" />
        <h6 className="title fw-semibold text-cl-1">All Categories</h6>
      </div>
      <nav
        className={`category-menu active-item  ${
          activeDropdown ? "active" : ""
        }`}
      >
        <div className="menu-category-menu-container">
          <ul id="primary-menu" className="megamenu">
            <li className="menu-item">
              <Link to={`/shop/top-dealers/Top Dealers`}>
                  <Award size={20} />
                  <span>Top Dealers</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/shop/equipments/Equipments & Machinery`}>
                <Blocks size={20} />
                <span>Equipments & Machinery</span>
              </Link>
            </li>
              <li className="menu-item">
                  <Link to={`/shop/all-jobs/All Jobs`}>
                      <Briefcase size={20} />
                      <span>All Jobs</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/used-items/Used Items`}>
                      <RefreshCcw size={20} />
                      <span>Used Items</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/rent-items/Rent Items`}>
                      <Key size={20} />
                      <span>Rent Items</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/brand-new-items/Brand New Items`}>
                      <Sparkles size={20} />
                      <span>Brand New Items</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/video-camera/Video & Camera Equipments`}>
                      <Clapperboard size={20} />
                      <span>Video & Camera Equipments</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/audio-sound/Audio & Sound Equipments`}>
                      <Headphones size={20} />
                      <span>Audio & Sound Equipments</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/printing-machinery/Printing Machinery`}>
                      <Printer size={20} />
                      <span>Printing Machinery</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/job-seeking/Job Seeking`}>
                      <Search size={20} />
                      <span>Job Seeking</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/job-hiring/Job Hiring`}>
                      <UserSearch size={20} />
                      <span>Job Hiring</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/companies-directory/Companies Directory`}>
                      <MapPinHouse size={20} />
                      <span>Companies Directory</span>
                  </Link>
              </li>
              <li className="menu-item">
                  <Link to={`/shop/service-providers/Service Providers`}>
                      <Store size={20} />
                      <span>Service Providers</span>
                  </Link>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
