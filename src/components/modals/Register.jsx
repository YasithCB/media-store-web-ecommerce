import React, {useState} from "react";
import {signup} from "@/api/auth.js";

import facebookIcon from '../../../public/icons/social/fb.svg'
import googleIcon from '../../../public/icons/social/google.svg'
import {createDealer} from "@/api/dealers.js";
import {useNavigate} from "react-router-dom";

// Define subcategories
const dealerSubcategories = {
    id: 3,
    title: "Top Dealers",
    subcategories: [
        {id: 19, title: "Media Companies"},
        {id: 20, title: "Advertising Companies"},
        {id: 21, title: "Sales & Rentals"},
        {id: 22, title: "Printing & Publishing Dealers"},
        {id: 23, title: "Photography & Videography Dealers"},
        {id: 24, title: "Signage & Display Dealers"},
        {id: 25, title: "Packaging & Merchandising Dealers"},
        {id: 26, title: "Technology Dealers"},
        {id: 27, title: "Other"},
    ],

};

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [role, setRole] = useState("user"); // <-- "user" or "dealer"

    const [dealerFormData, setDealerFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        whatsapp: "",
        website_url: "",
        address_line1: "",
        address_line2: "",
        city: "",
        country: "",
        category_id: '3',
        subcategory_id: "",
        subcategory_title: "",
        category_title: "Top Dealers",
        description: "",
        services: [],
        logo: null,
    });
    const [serviceInput, setServiceInput] = useState("");

    // Handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDealerFormData((prev) => ({...prev, [name]: value}));
    };

    // add / change logo
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setDealerFormData((prev) => ({...prev, logo: file}));

        // reset the input on next tick (after React state updates)
        setTimeout(() => {
            e.target.value = "";
        }, 0);
    };

    // Handle services
    const handleServiceKeyDown = (e) => {
        if (e.key === "Enter" && serviceInput.trim()) {
            e.preventDefault();
            if (!dealerFormData.services.includes(serviceInput.trim())) {
                setDealerFormData((prev) => ({
                    ...prev,
                    services: [...prev.services, serviceInput.trim()],
                }));
            }
            setServiceInput("");
        }
    };

    const removeService = (index) => {
        setDealerFormData((prev) => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index),
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            let res;
            // logic based on selected role
            if (role === "dealer") {
                // Prepare form data for API
                const data = new FormData();
                Object.keys(dealerFormData).forEach((key) => {
                    if (key === "logo") {
                        if (dealerFormData.logo) data.append("logo", dealerFormData.logo);
                    } else if (key === "services") {
                        data.append("services", JSON.stringify(dealerFormData.services));
                    } else {
                        data.append(key, dealerFormData[key]);
                    }
                });

                res = await createDealer(dealerFormData);
                console.log(`Registering as Dealer response : ${res}`)
            } else {
                res = await signup({name, email, phone, password});
                console.log(`Registering as User response : ${res}`)
            }

            console.log('resp : register')
            console.log(res)

            if (res.status === 'success') {
                // show message instead of auto-login
                setSuccess("Registration successful! You can now log in.");
                setName("");
                setEmail("");
                setPassword("");
                setPhone("");

                setDealerFormData({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    whatsapp: "",
                    website_url: "",
                    address_line1: "",
                    address_line2: "",
                    city: "",
                    country: "",
                    category_id: '3',
                    subcategory_id: "",
                    subcategory_title: "",
                    category_title: "Top Dealers",
                    description: "",
                    services: [],
                    logo: null,
                })

            } else {
                setError(res.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="modal modalCentered fade modal-log" id="register">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
          <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
          />
                    <div className="modal-log-wrap list-file-delete">
                        <h5 className="title fw-semibold">Sign Up</h5>

                        {/* Role Tabs */}
                        <div className="login-role-tabs d-flex justify-content-center mb-3">
                            <button
                                type="button"
                                className={`role-tab ${role === "user" ? "active" : ""}`}
                                onClick={() => setRole("user")}
                            >
                                Join as User
                            </button>
                            <button
                                type="button"
                                className={`role-tab ${role === "dealer" ? "active" : ""}`}
                                onClick={() => setRole("dealer")}
                            >
                                Join as Dealer
                            </button>
                        </div>

                        {role === "dealer" ?
                            (
                                // dealer register
                                <form onSubmit={handleSignUp} className="form-log">
                                    <div className="form-content">

                                        {/* Dealer Name */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Dealer Name *</label>
                                            <input
                                                type="text"
                                                className='modern-input'
                                                placeholder="Dealer / Company Name"
                                                name="name"
                                                value={dealerFormData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>

                                        {/* Dealer subcategory */}
                                        <div className="col-12 col-md-6 custom-select">
                                            <label className="form-label">Select Category *</label>
                                            <select
                                                className="form-select modern-select"
                                                value={dealerFormData.subcategory_id || ""} // ensure controlled input
                                                onChange={(e) => {
                                                    const subcategoryId = parseInt(e.target.value);
                                                    const selectedSubcategory = dealerSubcategories.subcategories.find(
                                                        (sub) => sub.id === subcategoryId
                                                    );

                                                    // Update formData
                                                    setDealerFormData((prev) => ({
                                                        ...prev,
                                                        category_id: dealerSubcategories.id,              // from your object
                                                        category_title: dealerSubcategories.title,        // from your object
                                                        subcategory_id: subcategoryId,                    // selected subcategory id
                                                        subcategory_title: selectedSubcategory
                                                            ? selectedSubcategory.title
                                                            : "",                                           // selected subcategory title
                                                    }));
                                                }}
                                            >
                                                <option value="">Select Subcategory</option>
                                                {dealerSubcategories.subcategories.map((sub) => (
                                                    <option key={sub.id} value={sub.id}>
                                                        {sub.title}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>

                                        {/* Email */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Email *</label>
                                            <input
                                                type="email"
                                                className='modern-input'
                                                placeholder="Your email"
                                                name="email"
                                                value={dealerFormData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>

                                        {/* Password */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Password *</label>
                                            <input
                                                className='modern-input'
                                                type="password"
                                                placeholder="Enter password"
                                                name="password"
                                                value={dealerFormData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>

                                        {/* Phone */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Phone *</label>
                                            <input
                                                className='modern-input'
                                                type="text"
                                                placeholder="Your phone number"
                                                name="phone"
                                                value={dealerFormData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>

                                        {/* WhatsApp */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">WhatsApp</label>
                                            <input
                                                className='modern-input'
                                                type="text"
                                                placeholder="WhatsApp number"
                                                name="whatsapp"
                                                value={dealerFormData.whatsapp}
                                                onChange={handleChange}
                                            />
                                        </fieldset>

                                        {/* Website */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Website URL</label>
                                            <input
                                                className='modern-input'
                                                type="text"
                                                placeholder="https://example.com"
                                                name="website_url"
                                                value={dealerFormData.website_url}
                                                onChange={handleChange}
                                            />
                                        </fieldset>

                                        {/* City / Country */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">City</label>
                                            <input
                                                className='modern-input'
                                                type="text"
                                                placeholder="City"
                                                name="city"
                                                value={dealerFormData.city}
                                                onChange={handleChange}
                                            />
                                        </fieldset>

                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Country</label>
                                            <input
                                                className='modern-input'
                                                type="text"
                                                placeholder="Country"
                                                name="country"
                                                value={dealerFormData.country}
                                                onChange={handleChange}
                                            />
                                        </fieldset>

                                        {/* Logo */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Logo</label>
                                            {dealerFormData.logo ? (
                                                <div className="mt-2 text-center">

                                                    <div className="position-relative d-inline-block">
                                                        <img
                                                            src={URL.createObjectURL(dealerFormData.logo)}
                                                            alt="Logo preview"
                                                            className="img-fluid rounded shadow-sm mb-2"
                                                            style={{maxWidth: "120px"}}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger remove-logo-btn"
                                                            onClick={() =>
                                                                setDealerFormData((prev) => ({...prev, logo: null}))
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </div>

                                                </div>
                                            ) : (
                                                <input
                                                    type="file"
                                                    className="form-control modern-input"
                                                    accept="image/*"
                                                    onChange={handleLogoChange}
                                                />
                                            )}

                                        </fieldset>

                                        {/* Description */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Description</label>
                                            <textarea
                                                placeholder="Write a short description"
                                                name="description"
                                                value={dealerFormData.description}
                                                onChange={handleChange}
                                                className="form-control modern-input"
                                                rows={3}
                                            />
                                        </fieldset>

                                        {/* Services */}
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Services</label>
                                            <input
                                                type="text"
                                                className="form-control modern-input"
                                                placeholder="Type a service and press Enter"
                                                value={serviceInput}
                                                onChange={ (e)=>
                                                    setServiceInput(e.target.value)
                                                }
                                                onKeyDown={handleServiceKeyDown}
                                            />
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                {dealerFormData.services.map((srv, index) => (
                                                    <span
                                                        key={index}
                                                        className="badge bg-warning-subtle border border-warning text-secondary px-3 py-2 d-flex align-items-center"
                                                    >
                                              {srv}
                                                        <button
                                                            type="button"
                                                            className="btn-close btn-close-sm ms-2"
                                                            onClick={() => removeService(index)}
                                                            style={{fontSize: "0.7rem"}}
                                                        ></button>
                                        </span>
                                                ))}
                                            </div>
                                        </fieldset>

                                        {error && <p className="text-danger mt-2">{error}</p>}
                                        {success && <p className="text-success mt-2">{success}</p>}
                                    </div>

                                    <button type="submit" className="tf-btn w-100 text-white" disabled={loading}>
                                        {loading ? "Registering..." : "Register Dealer"}
                                    </button>
                                </form>
                            )
                            :
                            (
                                // user register
                                <form onSubmit={handleSignUp} className="form-log">
                                    <div className="form-content">
                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Name *</label>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </fieldset>

                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Email *</label>
                                            <input
                                                type="email"
                                                placeholder="Your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </fieldset>

                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Password *</label>
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </fieldset>

                                        <fieldset>
                                            <label className="fw-semibold body-md-2">Phone *</label>
                                            <input
                                                type="text"
                                                placeholder="Your phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </fieldset>

                                        {error && <p className="text-danger">{error}</p>}
                                        {success && <p className="text-success">{success}</p>}
                                    </div>

                                    <button type="submit" className="tf-btn w-100 text-white" disabled={loading}>
                                        {loading ? "Signing up..." : "Sign Up"}
                                    </button>

                                    <p className="body-text-3 text-center">
                                        Already have an account?
                                        <a href="#log" data-bs-toggle="modal" className="fw-bold ms-2">
                                            Sign in
                                        </a>
                                    </p>
                                </form>
                            )

                        }


                        <div className="orther-log text-center">
                            <span className="br-line bg-gray-5"/>
                            <p className="caption text-main-2">Or login with</p>
                        </div>

                        <ul className="list-log">
                            <li>
                                <a href="#" className="tf-btn-primary btn-line w-100 social-btn">
                                    <img
                                        src={facebookIcon}
                                        alt="Facebook"
                                        style={{width: 20, height: 20}}
                                    />
                                    <span className="body-md-2 fw-semibold ms-2">Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="tf-btn-primary btn-line w-100 social-btn">
                                    <img
                                        src={googleIcon}
                                        alt="Google"
                                        style={{width: 20, height: 20}}
                                    />
                                    <span className="body-md-2 fw-semibold ms-2">Google</span>
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}
