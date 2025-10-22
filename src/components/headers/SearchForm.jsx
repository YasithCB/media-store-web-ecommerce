import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const categories = [
  { rel: "top-dealers", label: "Top Dealers" },
  { rel: "equipments", label: "Equipments & Machinery" },
  { rel: "jobs", label: "Jobs" },
  { rel: "studios", label: "Studios" },
];

export default function SearchForm({
  parentClass = "form-search-product style-2",
}) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Equipments & Machinery");

    const navRef = useRef(null);
    const navigate = useNavigate();

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

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to shop page with query params
        navigate(`/shop?search=${encodeURIComponent(searchTerm.toLowerCase())}&category=${encodeURIComponent(activeCategory)}`);
    };

  return (
    <form
      ref={navRef}
      onSubmit={(e) => e.preventDefault()}
      className={parentClass}
    >
      <div className={`select-category ${activeDropdown ? "active" : ""}`}>
        <div
          onClick={() => setActiveDropdown(true)}
          className="tf-select-custom"
        >
          {activeCategory}
        </div>
        <ul
          className="select-options"
          style={{ display: activeDropdown ? "block" : "none" }}
        >
          <div className="header-select-option">
            <span>Select a Category</span>
            <span
              className="close-option"
              onClick={() => setActiveDropdown(false)}
            >
              <i className="icon-close"></i>
            </span>
          </div>
          {categories.map((item, index) => (
            <li
              rel={item.rel}
              onClick={() => {
                setActiveCategory(item.label);
                setActiveDropdown(false);
              }}
              key={index}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <span className="br-line type-vertical bg-line"></span>

        {/* Search bar */}
        <fieldset>
            <input
                type="text"
                placeholder="Search for products"
                className="ps-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </fieldset>
        <button type="submit" className="btn-submit-form" onClick={handleSearch}>
            <i className="icon-search text-cl-5"></i>
        </button>
    </form>
  );
}
