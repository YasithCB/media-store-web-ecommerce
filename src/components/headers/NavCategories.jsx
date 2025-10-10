import React, { useEffect, useRef, useState } from "react";
import { Award, Blocks, Briefcase, RefreshCcw, Key, Sparkles, Clapperboard, Store, Printer, Headphones, Search, UserSearch, MapPinHouse  } from "lucide-react";


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
              <a href="#">
                  <Award size={20} />
                  <span>Top Dealers</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="#">
                <Blocks size={20} />
                <span>Equipments & Machinery</span>
              </a>
            </li>
              <li className="menu-item">
                  <a href="#">
                      <Briefcase size={20} />
                      <span>Jobs</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <RefreshCcw size={20} />
                      <span>Used Items</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Key size={20} />
                      <span>Rent Items</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Sparkles size={20} />
                      <span>Brand New Items</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Clapperboard size={20} />
                      <span>Video & Camera Equipments</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Headphones size={20} />
                      <span>Audio & Sound Equipments</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Printer size={20} />
                      <span>Printing Equipments</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Search size={20} />
                      <span>Job Seeking</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <UserSearch size={20} />
                      <span>Job Hiring</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <MapPinHouse size={20} />
                      <span>Companies Directory</span>
                  </a>
              </li>
              <li className="menu-item">
                  <a href="#">
                      <Store size={20} />
                      <span>Service Providers</span>
                  </a>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
