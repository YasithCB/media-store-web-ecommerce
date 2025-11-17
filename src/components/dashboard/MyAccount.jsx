import React, {useEffect, useState} from "react";
import {useContextElement} from "@/context/Context.jsx";
import {toast} from "react-toastify";
import {getImageUrl} from "@/utlis/util.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";

export default function MyAccount() {
    const {currentUser, setCurrentUser} = useContextElement();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(currentUser || {});
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [role, setRole] = useState('')

    useEffect(() => {
        if (!currentUser) return

        console.log(formData)

        if (currentUser.id.startsWith("u")) {
            setRole('user')
        } else if (currentUser.id.startsWith("d")) {
            setRole('dealer')
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const createFormData = (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value === null || value === undefined) return; // skip null/undefined

            // Skip logo and photos for now
            if (key === "logo" || key === "photos") return;

            // handle arrays or objects
            else if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
            }
            // handle simple fields
            else {
                formData.append(key, value);
            }
        });

        // Only append new logo if user selected a file
        if (logoFile instanceof File) {
            formData.append("logo", logoFile);
        }

        return formData;
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Usage:
            let formDataToSend = await createFormData(currentUser);

            let response;

            if (role === 'dealer') {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dealer/${currentUser.id}`, {
                    method: "PUT",
                    body: formDataToSend, // do NOT set headers
                });
            } else {
                response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/${currentUser.id}`, {
                    method: "PUT",
                    body: formDataToSend, // do NOT set headers
                });
            }

            // FIX: parse JSON from response
            const data = await response.json();

            if (data['status'] === 'success') {
                setCurrentUser(formData);
                toast.success("Profile updated successfully!");
                setEditing(false);
            } else {
                toast.error(data['message']);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };


    if (!currentUser) return <LoadingDots/>

    return (
        <div className="my-account-content account-dashboard">
            <div className="mb_60">
                <h3 className="fw-semibold mb-20">
                    Hello {role === 'user' ? currentUser?.name : currentUser?.title}
                </h3>

                <div className="card-body p-4">
                    {role === 'dealer' &&
                        <div className="mb-3 text-center">
                            <div className="text-center mb-4 position-relative">
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        setLogoFile(file)
                                        if (file) {
                                            setPreviewUrl(URL.createObjectURL(file))
                                            setFormData((prev) => ({...prev, logo: file}));
                                        }
                                    }}
                                />

                                <img
                                    src={getImageUrl(previewUrl || currentUser?.logo || "/default-avatar.png")}
                                    alt="Profile"
                                    width={200}
                                    height={200}
                                    style={{
                                        borderRadius: "10%",
                                        objectFit: "cover",
                                        border: "2px solid #ddd",
                                        cursor: editing ? "pointer" : "default",
                                    }}
                                    onClick={() => editing && document.getElementById("profileImageInput").click()}
                                />

                                {editing && (
                                    <div
                                        className="position-absolute bottom-0 start-50 translate-middle-x bg-dark text-white py-1 px-3 rounded-3 small"
                                        style={{cursor: "pointer"}}
                                        onClick={() => document.getElementById("profileImageInput").click()}
                                    >
                                        Change Photo
                                    </div>
                                )}
                            </div>
                        </div>
                    }

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            {role === "user" ? "Name" : "Title"}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name={role === "user" ? "name" : "title"}
                            value={role === "user" ? formData.name || "" : formData.title || ""}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    {formData.address && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    {formData.city && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={formData.city || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    {formData.country && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={formData.country || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    {formData.established_year && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Established Year</label>
                            <input
                                type="text"
                                className="form-control"
                                name="established_year"
                                value={formData.established_year || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    {formData.license_no && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Business License No</label>
                            <input
                                type="text"
                                className="form-control"
                                name="license_no"
                                value={formData.license_no || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    {/* LICENSE EXP DATE */}
                    {formData.license_exp_date && (
                        <fieldset className='d-flex flex-column mb-3'>
                            <label className="fw-semibold body-md-2">License Exp Date</label>
                            <input
                                className="modern-input"
                                type="date"
                                name="license_exp_date"
                                min={new Date().toISOString().split("T")[0]}   // prevents past dates
                                value={new Date(formData.license_exp_date).toISOString().split("T")[0]} // <-- convert to YYYY-MM-DD
                                onChange={handleChange}
                            />
                        </fieldset>
                    )}


                    {formData.website_url && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Website URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="website_url"
                                value={formData.website_url || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    {formData.whatsapp && (
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Whatsapp</label>
                            <input
                                type="text"
                                className="form-control"
                                name="whatsapp"
                                value={formData.whatsapp || ""}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                        {!editing ? (
                            <button
                                className="btn btn-dark w-100 me-2"
                                onClick={() => setEditing(true)}
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn tf-btn w-100 me-2"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    className="btn tf-btn-dark w-100"
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData(currentUser);
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
