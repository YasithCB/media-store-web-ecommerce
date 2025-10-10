import React, { useEffect, useRef, useState } from "react";
const categories = [
  { rel: "", label: "All categories" },
  { rel: "top-dealers", label: "Top Dealers" },
  { rel: "equipments", label: "Equipments & Machinery" },
  { rel: "jobs", label: "Jobs" },
  { rel: "used-items", label: "Used Items" },
  { rel: "rent-items", label: "Rent Items" },
  { rel: "audio-equipments", label: "Audio & Sound Equipments" },
  { rel: "video-equipments", label: "Camera & Video Equipments" },
  { rel: "job-seeking", label: "Job Seeking" },
  { rel: "job-hiring", label: "Job Hiring" },
  { rel: "service-providers", label: "Service Providers" },
  { rel: "companies-directory", label: "Companies Directory" },
];

export default function SearchForm({
  parentClass = "form-search-product style-2",
}) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All categories");
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
            <span>Select Categories</span>
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
      <fieldset>
        <input type="text" placeholder="Search for products" className='ps-2' />
      </fieldset>
      <button type="submit" className="btn-submit-form">
        <i className="icon-search text-cl-5"></i>
      </button>
    </form>
  );
}
