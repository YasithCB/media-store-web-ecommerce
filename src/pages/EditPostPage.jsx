import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Footer1 from "@/components/footers/Footer1";
import Features2 from "@/components/common/Features2";
import RecentProducts from "@/components/common/RecentProducts";
import MetaComponent from "@/components/common/MetaComponent";
import Header2 from "@/components/headers/Header2.jsx";
import {SmartToast} from "@/components/custom/ToastContainer.jsx";
import LoadingDots from "@/components/custom/loadingDots.jsx";
import {getPostById, updatePost} from "@/api/posts.js";
import {getImageUrl} from "@/utlis/util.js";
import {CATEGORIES_LIST} from "@/data/constants.js";

const metadata = {
    title: "Edit Post || MediaStore",
    description: "Edit your existing post in MediaStore",
};

export default function EditPostPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [logo, setLogo] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchPostData = async () => {
            try {
                const res = await getPostById(id);
                // response structure: { status, code, message, data: { ...post } }
                const data = res.data?.data || res.data || res; // handle wrapper differences

                // ✅ no need to JSON.parse photos — it's already an array
                setFormData(data);

                setSelectedCategory(data.category_title);
                setSelectedCategoryId(data.category_id?.toString() || "");
                setSelectedSubcategoryId(data.subcategory_id?.toString() || "");

                if (Array.isArray(data.photos)) {
                    setPhotos(data.photos); // already array of URLs
                } else if (typeof data.photos === "string" && data.photos !== "") {
                    // if backend ever sends a single string
                    setPhotos([data.photos]);
                } else {
                    setPhotos([]);
                }

                if (data.logo) setLogo(data.logo);
            } catch (err) {
                console.error("Failed to load post:", err);
                setError("Failed to load post data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [id]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePhotoChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setPhotos((prev) => [...prev, ...newFiles]);
    };

    const handleRemovePhoto = (index) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) setLogo(file);
    };

    const handleRemoveLogo = () => setLogo(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formDataToSend = new FormData();

            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => formDataToSend.append(key, item));
                } else if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            });

            // Append photos and logo
            photos.forEach((file) => formDataToSend.append("photos", file));
            if (logo) formDataToSend.append("logo", logo);

            // Determine endpoint based on category
            let response;
            if (selectedCategoryId === "1") {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/equipment-posts/${id}`, {
                    method: "PUT",
                    body: formDataToSend, // do NOT set headers
                });
            } else if (selectedCategoryId === "2") {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/job-posts/${id}`, {
                    method: "PUT",
                    body: formDataToSend, // do NOT set headers
                });
            } else if (selectedCategoryId === "4") {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/studio-posts/${id}`, {
                    method: "PUT",
                    body: formDataToSend, // do NOT set headers
                });
            }

            if (!response.ok) throw new Error(await response.text());

            SmartToast.success("Post updated successfully!");
            navigate("/my-posts");
        } catch (err) {
            SmartToast.error(`Update failed: ${err.message}`);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };


    if (loading)
        return (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <p className="mb-2">Loading post...</p>
                <LoadingDots/>
            </div>
        );

    if (error)
        return (
            <div className="text-center text-danger py-5">
                <p>{error}</p>
            </div>
        );

    return (
        <>
            <MetaComponent meta={metadata}/>
            <Header2/>
            <div className="container my-5">
                <h3 className="mb-4">Edit Post</h3>

                <form onSubmit={handleSubmit}>
                    {/* CATEGORY | SUBCATEGORY */}
                    <div className="row">
                        <div className="mb-3 col-md custom-input">
                            <label className="form-label">Category</label>
                            <p className="form-control-plaintext fw-bold text-uppercase">{formData.category_title || "-"}</p>
                        </div>

                        <div className="mb-3 col-md subcategory-dropdown col-12 col-md-6 custom-select">
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
                                        sub_category_title: selectedSub ? selectedSub.title : "",
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

                    {/* TITLE */}
                    <div className="mb-3 custom-input">
                        <label className="form-label">Title *</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control modern-input"
                            value={formData.title || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* CONTACT + EMAIL */}
                    <div className="row">
                        <div className="mb-3 col-md-6 custom-input">
                            <label className="form-label">Mobile *</label>
                            <input
                                type="text"
                                name="contact"
                                className="form-control modern-input"
                                value={formData.contact || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 col-md-6 custom-input">
                            <label className="form-label">Email *</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control modern-input"
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* CITY | COUNTRY | QTY */}
                    <div className="row">
                        <div className="mb-3 col-12 col-md custom-input">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                name="city"
                                className="form-control modern-input"
                                value={formData.city || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3 col-12 col-md custom-input">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                name="country"
                                className="form-control modern-input"
                                value={formData.country || ""}
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

                    {/* DESCRIPTION */}
                    <div className="mb-3 custom-input">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control modern-input"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                        />
                    </div>

                    {/* PRICE / SALARY */}
                    {selectedCategoryId === "2" ? (
                        <>
                            <div className="mb-3 custom-input">
                                <label className="form-label">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    className="form-control modern-input"
                                    value={formData.salary || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3 custom-input">
                                <label className="form-label">Company Name</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    className="form-control modern-input"
                                    value={formData.company_name || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label fw-semibold">Company Logo</label>
                                {logo ? (
                                    <div className="position-relative">
                                        <img
                                            src={
                                                typeof logo === "string"
                                                    ? getImageUrl(logo)
                                                    : URL.createObjectURL(logo)
                                            }
                                            alt="Logo"
                                            style={{
                                                width: 120,
                                                height: 120,
                                                objectFit: "contain",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 py-0 px-1"
                                            onClick={handleRemoveLogo}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleLogoChange}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-3 custom-input">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control modern-input"
                                    value={formData.price || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    {/* PHOTOS */}
                    {selectedCategoryId !== "2" &&
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Photos</label>
                            <input
                                type="file"
                                className="form-control"
                                multiple
                                onChange={handlePhotoChange}
                            />

                            {photos.length > 0 && (
                                <div className="mt-3 d-flex flex-wrap gap-3">
                                    {photos.map((file, index) => (
                                        <div
                                            key={index}
                                            className="position-relative border rounded p-2 bg-light"
                                            style={{width: 100, height: 100, overflow: "hidden"}}
                                        >
                                            <img
                                                src={
                                                    typeof file === "string"
                                                        ? getImageUrl(file)
                                                        : URL.createObjectURL(file)
                                                }
                                                alt="preview"
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
                    }

                    {saving &&
                        <LoadingDots />
                    }

                    {/* SUBMIT BUTTON */}
                    <button
                        className="btn bg-dark text-white w-100 fw-bold text-uppercase mt-3"
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Updating..." : "Update Post"}
                    </button>
                </form>
            </div>

            <RecentProducts/>
            <Features2/>
            <Footer1/>
        </>
    );
}
