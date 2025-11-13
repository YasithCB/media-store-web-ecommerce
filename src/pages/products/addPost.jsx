import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import Header4 from "@/components/headers/Header4";
import Footer1 from "@/components/footers/Footer1";
import Features2 from "@/components/common/Features2";
import RecentProducts from "@/components/common/RecentProducts";
import MetaComponent from "@/components/common/MetaComponent";
import {toast} from "react-toastify";
import {SmartToast} from "@/components/custom/ToastContainer.jsx";
import Header2 from "@/components/headers/Header2.jsx";
import {useContextElement} from "@/context/Context.jsx";
import {CATEGORIES_LIST} from "@/data/constants.js";

const metadata = {
    title: "Add Post || MediaStore - MultiMedia eCommerce Website",
    description: "MediaStore - MultiMedia eCommerce Website",
};

export default function AddPostPage() {
    const { currentUser } = useContextElement();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category_id: 1,
        user_id: currentUser.id,
        subcategory_id: 0,
        title: "",
        quantity: 1,
        company_name: "",
        category_title: "Equipment and Machinery",
        subcategory_title: "",
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

    const requiredFields = [
        "title",
        "category_id",
        "subcategory_id",
        "category_title",
        "subcategory_title",
        "contact",
        "description",
    ];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [photos, setPhotos] = useState([]);
    const [logo, setLogo] = useState();

    const [selectedCategory, setSelectedCategory] = useState('Equipment and Machinery')
    const [selectedCategoryId, setSelectedCategoryId] = useState('1')
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('0');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateFormData = (data, photos) => {
        for (const field of requiredFields) {
            if (!data[field] || data[field].toString().trim() === "") {
                return `Field "${field}" is required`;
            }
        }

        // Check at least one photo
        if ((!photos || photos.length === 0) && !logo) {
            return "Please upload at least one photo or the logo";
        }

        // Validate numeric fields
        if (isNaN(data.price)) return "Price must be a number";
        if (data.sale_price && isNaN(data.sale_price)) return "Sale Price must be a number";

        // Basic email validation
        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) return "Invalid email address";
        }

        return null; // No errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data first
        const validationError = validateFormData(formData, photos);
        if (validationError) {
            SmartToast.error(validationError);
            return;
        }

        setLoading(true);
        try {
            // Prepare FormData
            const formDataToSend = new FormData();

            // Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // for arrays like photos
                    value.forEach((item) => {
                        formDataToSend.append(key, item);
                    });
                } else if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            });

            // Append photos (if stored separately)
            photos.forEach((file) => formDataToSend.append("photos", file));
            if (logo) formDataToSend.append("logo", logo);

            // ✅ Use normal fetch
            let response;
            if (selectedCategory === 'Equipment and Machinery') {
                 response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/equipment-posts`, {
                    method: "POST",
                    body: formDataToSend, // Do NOT set headers manually
                });
            }else if (selectedCategory === 'Jobs') {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/job-posts`, {
                    method: "POST",
                    body: formDataToSend, // Do NOT set headers manually
                });
            }else  {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/studio-posts`, {
                    method: "POST",
                    body: formDataToSend, // Do NOT set headers manually
                });
            }

            if (!response.ok) {
                const text = await response.text(); // for debugging
                throw new Error(`Server error: ${text}`);
            }

            // Success
            const data = await response.json();
            SmartToast.success("Post Created successfully!!");
            navigate('/')
        } catch (error) {
            setError(error.message)
            toast.error(`Post Create Failed - ${error.message}`, {
                autoClose: 5000,
            });
            console.error("❌ Error submitting form:", error);
        }finally {
            setLoading(false)
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

    return (
        <>
            <MetaComponent meta={metadata} />
            <Header2 />

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
                            value={selectedCategoryId || ""} // ensure controlled input
                            onChange={(e) => {
                                const categoryId = e.target.value;
                                const selectedCategory = CATEGORIES_LIST.find(
                                    (cat) => cat.id === parseInt(categoryId)
                                );

                                setSelectedCategoryId(categoryId);

                                // Save the string value to a separate state variable
                                setSelectedCategory(selectedCategory ? selectedCategory.title : "");

                                // reset subcategory when category changes
                                setSelectedSubcategoryId("");

                                // update formData
                                setFormData((prev) => ({
                                    ...prev,
                                    category_id: categoryId ? parseInt(categoryId) : null,
                                    category_title: selectedCategory ? selectedCategory.title : "",
                                    subcategory_id: null,
                                    subcategory_title: "",
                                }));
                            }}
                        >
                            <option value="">Select Category</option>
                            {CATEGORIES_LIST.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 subcategory-dropdown col-12 col-md-6 custom-select">
                        <label className="form-label">Subcategory *</label>
                        <select
                            className="form-select modern-select"
                            value={selectedSubcategoryId || ""}
                            onChange={(e) => {
                                const subId = e.target.value;
                                const selectedCategory = CATEGORIES_LIST.find(
                                    (c) => c.id === parseInt(selectedCategoryId)
                                );
                                const selectedSub = selectedCategory?.subcategories.find(
                                    (s) => s.id === parseInt(subId)
                                );

                                setSelectedSubcategoryId(subId);

                                setFormData((prev) => ({
                                    ...prev,
                                    subcategory_id: subId ? parseInt(subId) : null,
                                    subcategory_title: selectedSub ? selectedSub.title : "",
                                }));
                            }}
                            disabled={!selectedCategoryId}
                        >
                            <option value="">Select Subcategory</option>
                            {CATEGORIES_LIST
                                .find((c) => c.id === parseInt(selectedCategoryId))
                                ?.subcategories.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.title}
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
                        <div className="mb-3 col-12 col-md custom-input">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3 col-12 col-md custom-input">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control modern-input"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        { selectedCategoryId !== '4' &&
                            <div className="mb-3 col-12 col-md custom-input">
                                <label className="form-label">{selectedCategoryId === '2' ? 'Positions Available QTY' : 'Available QTY'}</label>
                                <input
                                    type="number"
                                    className="form-control modern-input"
                                    name="quantity"
                                    value={formData.quantity}
                                    min={1}       // no negative numbers
                                    step={1}      // only integers
                                    onChange={handleChange}
                                />
                            </div>
                        }
                    </div>

                    { selectedCategoryId === '2' ?

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

                            <div className="mb-3 custom-input">
                                <label className="form-label">Company Name *</label>
                                <input
                                    type="text"
                                    className="form-control modern-input"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    required
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
                                <label className="form-label">{selectedCategoryId === '4' ? 'Price Per Hour' : 'Price'}</label>
                                <input
                                    type="number"
                                    className="form-control modern-input"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            { selectedCategoryId === '1' &&
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
                            }

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

                    <button onClick={handleSubmit} className="btn bg-dark text-white w-100 fw-bold text-uppercase letter-sp-s2 mt-3" type="submit" disabled={loading}>
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
