import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header4 from "@/components/headers/Header4";
import Footer1 from "@/components/footers/Footer1";
import Features2 from "@/components/common/Features2";
import RecentProducts from "@/components/common/RecentProducts";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
    title: "Add Post || MediaStore - MultiMedia eCommerce Website",
    description: "MediaStore - MultiMedia eCommerce Website",
};

// Define categories and subcategories
const categories = {
    "Equipment and Machinery": [
        'Video & Camera Equipment',
        'Audio & Sound Equipment',
        'Lighting Equipment',
        'Studio & Production Equipment',
        'Broadcasting Equipment',
        'Accessories and Parts',
        'Printing Machinery',
        'Other Media-related Equipments',
    ],
    "Jobs": [
        'Creative Roles',
        'Media Production',
        'Broadcast & Journalism',
        'Marketing & Advertising',
        'Event & Media Management',
        'Technical & Support',
        'Other Media-related Roles',
    ],
};

export default function AddPostPage() {
    const [formData, setFormData] = useState({
        title: "",
        category_title: "",
        sub_category_title: "",
        contact: "",
        email: "",
        price: "",
        salary: "",
        sale_price: "",
        description: "",
        brand: "",
        model: "",
        usage: "",
        item_condition: "",
        address_line1: "",
        address_line2: "",
        country: "",
        city: "",
        location: "",
        photos: [], // store array of URLs or files
        servicesList: [], // store array of URLs or files
        logo: null,
        is_rent: false,
        is_used: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [photos, setPhotos] = useState([]);
    const [logo, setLogo] = useState();
    const [service, setService] = useState("");
    const [servicesList, setServicesList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('Equipment and Machinery')
    const [selectedSubcategory, setSelectedSubcategory] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            console.log("Submitting Equipment Post:", formData);
            // TODO: Call your API here to save the equipment post
        } catch (err) {
            setError("Failed to submit post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Add new photos
    const handlePhotoChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setPhotos((prev) => [...prev, ...newFiles]);
        e.target.value = ""; // reset input
    };

    // Remove a specific photo
    const handleRemovePhoto = (index) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) setLogo(file);
    };

    const handleRemoveLogo = () => {
        setLogo(null);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(""); // Reset subcategory when category changes
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && service.trim() !== "") {
            e.preventDefault();
            if (!servicesList.includes(service.trim())) {
                setServicesList([...servicesList, service.trim()]);
            }
            setService("");
        }
    };

    const removeService = (item) => {
        setServicesList(servicesList.filter((s) => s !== item));
    };

    return (
        <>
            <MetaComponent meta={metadata} />
            <Header4 />

            <div className="tf-sp-3 pb-0">
                <div className="container">
                    <ul className="breakcrumbs">
                        <li>
                            <Link to={`/`} className="body-small link">
                                Home
                            </Link>
                        </li>
                        <li className="d-flex align-items-center">
                            <i className="icon icon-arrow-right" />
                        </li>
                        <li>
                            <span className="body-small"> Add Equipment Post</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container my-5">
                <h3 className="mb-4">Add Post</h3>

                {/* category Tabs */}
                <div className="category-subcategory row mb-3">
                    <div className="mb-3 col-12 col-md-6 custom-select">
                        <label className="form-label">Category *</label>
                        <select
                            className="form-select modern-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select Category</option>
                            {Object.keys(categories).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 subcategory-dropdown col-12 col-md-6 custom-select">
                        <label className="form-label">Subcategory *</label>
                        <select
                            className="form-select modern-select"
                            value={selectedSubcategory}
                            onChange={handleSubcategoryChange}
                            disabled={!selectedCategory} // disable until category is selected
                        >
                            <option value="">Select Subcategory</option>
                            {selectedCategory &&
                                categories[selectedCategory].map((subcat) => (
                                    <option key={subcat} value={subcat}>
                                        {subcat}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 custom-input">
                        <label className="form-label">Title *</label>
                        <input
                            type="text"
                            className="form-control modern-input"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-6 custom-input">
                            <label className="form-label">Mobile *</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3 col-md-6 custom-input">
                            <label className="form-label">Email *</label>
                            <input
                                type="email"
                                className="form-control modern-input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 custom-input">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control modern-input"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-4 custom-input">
                            <label className="form-label">Brand</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 col-md-4 custom-input">
                            <label className="form-label">Model</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Usage</label>
                            <input
                                type="text"
                                className="form-control"
                                name="usage"
                                value={formData.usage}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-6 custom-input">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3 col-md-6 custom-input">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    { selectedCategory === 'Jobs' ?

                        // add company logo / salary
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label fw-semibold">Company Logo</label>
                                <div
                                    className="border rounded d-flex align-items-center justify-content-center bg-light position-relative"
                                    style={{
                                        width: 160,
                                        height: 160,
                                        overflow: "hidden",
                                        borderStyle: "dashed",
                                        borderColor: "#ccc",
                                    }}
                                >
                                    {logo ? (
                                        <>
                                            <img
                                                src={URL.createObjectURL(logo)}
                                                alt="logo preview"
                                                className="img-fluid"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 py-0 px-1"
                                                onClick={handleRemoveLogo}
                                            >
                                                ×
                                            </button>
                                        </>
                                    ) : (
                                        <label
                                            htmlFor="logoUpload"
                                            className="text-secondary text-center cursor-pointer"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className="icon icon-upload d-block fs-4 mb-1"></i>
                                            <span className="small">Click to upload</span>
                                            <input
                                                type="file"
                                                id="logoUpload"
                                                className="d-none"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        :

                        // Item images / price
                        <div className="mb-3">
                            <div className="mb-3 custom-input">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control modern-input"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label fw-semibold">Item Photos</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    onChange={handlePhotoChange}
                                />

                                {/* Show selected photos */}
                                {photos.length > 0 && (
                                    <div className="mt-3 d-flex flex-wrap gap-3">
                                        {photos.map((file, index) => (
                                            <div
                                                key={index}
                                                className="position-relative border rounded p-2 bg-light"
                                                style={{ width: 100, height: 100, overflow: "hidden" }}
                                            >
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    className="img-fluid rounded"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 py-0 px-1"
                                                    onClick={() => handleRemovePhoto(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-check mb-3 custom-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="is_rent"
                                    name="is_rent"
                                    checked={formData.is_rent}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label fw-semibold" htmlFor="is_rent">
                                    This is For Rent
                                </label>
                            </div>

                            <div className="form-check mb-3 custom-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="is_used"
                                    name="is_used"
                                    checked={formData.is_used}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label fw-semibold" htmlFor="is_used">
                                    This item is Used
                                </label>
                            </div>
                        </div>

                    }

                    {error && <p className="text-danger">{error}</p>}

                    <button className="btn bg-dark text-white w-100 fw-bold text-uppercase letter-sp-s2 mt-3" type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Add Post"}
                    </button>
                </form>
            </div>

            <RecentProducts/>
            <Features2/>
            <Footer1/>
        </>
    );
}
