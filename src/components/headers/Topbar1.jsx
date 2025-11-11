import React, {useState} from "react";
import {useContextElement} from "@/context/Context.jsx";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

import { LogOut ,User } from 'lucide-react';
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal.jsx";
import facebookIcon from "../../../public/icons/social/fb.svg";
import googleIcon from "../../../public/icons/social/google.svg";
import {login} from "@/api/auth.js";
import RegisterModal from "@/components/modals/RegisterModal.jsx";

export default function Topbar1({parentClass = "tf-topbar line-bt"}) {
    const { currentUser,logout , setCurrentUser, setAuthToken} = useContextElement();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showDealerProfile, setShowDealerProfile] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const [role, setRole] = useState("user"); // <-- "user" or "dealer"

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent form reload
        setError("");
        setLoading(true);

        try {
            let res;
            // logic based on selected role
            if (role === "dealer") {
                console.log("Logging in as Dealer", { email, password });
                res = await login({ email, password }, role);
            } else {
                console.log("Logging in as User", { email, password });
                res = await login({ email, password }, role);
            }


            // Example: if your API returns token or user data
            if (res?.['status'] === "success") {
                // Store user object / token
                localStorage.setItem("user", JSON.stringify(res['data']['user']));
                localStorage.setItem("auth_token", res['data']['token']);

                // ✅ set global values
                setCurrentUser(res['data']['user']); // keep it as an object
                setAuthToken(res['data']['token']);

                // Reload home page
                window.location.href = "/";
                setShowLogin(false)
            } else {
                throw new Error(res.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${parentClass} bg-dark`}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-12">
                        <div className="topbar-left justify-content-xl-start h-100">
                            <p className="body-small text-cl-2">
                                <i className="icon-headphone"/> Call us{" "}
                                <a
                                    href="tel:+971502303130"
                                    className="text-primary fw-semibold"
                                >
                                    +971 50 230 31 30
                                </a>
                            </p>

                            <p className="body-small text-cl-2">
                                <i className="fa-brands fa-whatsapp me-1"/>
                                <a
                                    href="https://wa.me/+97152303132"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white fw-semibold"
                                >
                                    +971 50 2 30 31 32
                                </a>
                            </p>

                            <p className="body-small text-cl-2">
                                Free Shipping on Order{" "}
                                <span className="fw-semibold text-cl-1">AED900+</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-6 d-none d-xl-block">
                        <div className="tf-cur justify-content-end bar-lang">
                            { currentUser &&
                                <>
                                    <div className="tf-cur-item tf-currencies gap-0 cs-pointer" onClick={() => navigate("/my-posts")}>
                                        <i className="fa-solid fa-file-lines text-cl-2 me-2"></i>
                                        <div className="tf-curs">
                                            <span className='body-small text-cl-2 hover-shine'>My Posts</span>
                                        </div>
                                    </div>

                                    <div className="tf-cur-item tf-currencies gap-0 cs-pointer" onClick={() => navigate("/my-orders")}>
                                        <i className="fa-solid fa-bag-shopping text-cl-2 me-2"></i>
                                        <div className="tf-curs">
                                            <span className='body-small text-cl-2 hover-shine'>My Orders</span>
                                        </div>
                                    </div>

                                    {/* MY PROFILE */}
                                    <div className="cs-pointer text-white d-flex gap-1 align-items-center hover-shine" onClick={() => navigate("/my-account")}>
                                        <User size={18} />
                                        <span className='body-small text-cl-2'>Account</span>
                                    </div>
                                </>
                            }

                            {currentUser ? (
                                <div className='d-flex align-items-center text-white'>
                                    <p>Welcome, {currentUser['name'] || currentUser['title']}</p>
                                    <LogOut
                                        className='ms-2 hover-red cs-pointer'
                                        size={18}
                                        onClick={() => {
                                            console.log('click')
                                            Swal.fire({
                                                title: 'Logout?',
                                                text: "Do you want to sign out from your account?",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: 'red',
                                                cancelButtonColor: 'black',
                                                confirmButtonText: 'Yes, logout',
                                                iconColor: 'red',
                                                cancelButtonText: 'Cancel',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    logout(); // call your logout function
                                                    Swal.fire({
                                                        title: 'Logged out!',
                                                        text: 'You have been successfully logged out.',
                                                        icon: 'success',
                                                        iconColor: 'black',
                                                        confirmButtonText: 'OK',
                                                        confirmButtonColor: 'black',
                                                        customClass: {
                                                            popup: 'rounded-4 shadow-lg',
                                                            title: 'fw-bold fs-5',
                                                            confirmButton: 'fw-semibold',
                                                        },
                                                    });
                                                }
                                            });
                                        }}
                                    />
                                </div>
                            ) : (
                                <div onClick={() => setShowLogin(true)}
                                     className='text-white cs-pointer d-flex gap-1 align-items-center'
                                >
                                    <User size={18} />
                                    Login
                                </div>
                            )}

                            {showLogin && (
                                <>
                                    {/* Modal Overlay */}
                                    <div
                                        className="modal-backdrop"
                                        style={{
                                            position: "fixed",
                                            inset: 0,
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            zIndex: 1040,
                                        }}
                                        onClick={() => setShowLogin(false)}
                                    />

                                    {/* Modal */}
                                    <div
                                        className="modal fade show"
                                        style={{
                                            display: "block",
                                            position: "fixed",
                                            inset: 0,
                                            zIndex: 1050,
                                            overflowY: "auto",
                                        }}
                                        onClick={(e) => e.stopPropagation()} // prevent overlay click from closing modal
                                    >
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content p-4">
                                              <span
                                                  className="icon icon-close"
                                                  onClick={() => setShowLogin(false)}
                                                  style={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
                                              />

                                                <div className="modal-log-wrap list-file-delete">
                                                    <h5 className="title fw-semibold mb-3">Log In</h5>

                                                    {/* Role Tabs */}
                                                    <div className="login-role-tabs d-flex justify-content-center mb-3">
                                                        <button
                                                            type="button"
                                                            className={`role-tab ${role === "user" ? "active" : ""}`}
                                                            onClick={() => setRole("user")}
                                                        >
                                                            Login a User
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`role-tab ${role === "dealer" ? "active" : ""}`}
                                                            onClick={() => setRole("dealer")}
                                                        >
                                                            Login as Dealer
                                                        </button>
                                                    </div>

                                                    <form onSubmit={handleLogin} className="form-log">
                                                        <div className="form-content">
                                                            <fieldset>
                                                                <label className="fw-semibold body-md-2">Email *</label>
                                                                <input
                                                                    type="text"
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

                                                            {error && <p className="text-danger">{error}</p>}

                                                            <a
                                                                href="#"
                                                                onClick={() => {
                                                                    setShowLogin(false);
                                                                    setShowForgot(true);
                                                                }}
                                                                className="link text-end body-text-3"
                                                            >
                                                                Forgot password?
                                                            </a>
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            className="tf-btn w-100"
                                                            disabled={loading}
                                                        >
                                                            {loading ? "Logging in..." : "Login"}
                                                        </button>

                                                        <p className="body-text-3 text-center">
                                                            Don't you have an account?
                                                            <span onClick={()=> {
                                                                setShowLogin(false)
                                                                setShowRegister(true)
                                                            }} data-bs-toggle="modal"
                                                               className="fw-bold ms-2 cs-pointer"
                                                            >
                                                                Register
                                                            </span>
                                                        </p>
                                                    </form>

                                                    <div className="orther-log text-center">
                                                        <span className="br-line bg-gray-5 my-3" />
                                                        <p className="caption text-main-2">Or login with</p>
                                                    </div>

                                                    <ul className="list-log d-flex gap-1">
                                                        <li className='col'>
                                                            <a href="#" className="tf-btn-primary btn-line w-100 social-btn">
                                                                <img src={facebookIcon} alt="Facebook" style={{ width: 20, height: 20 }} />
                                                                <span className="body-md-2 fw-semibold ms-2">Facebook</span>
                                                            </a>
                                                        </li>
                                                        <li className='col'>
                                                            <a href="#" className="tf-btn-primary btn-line w-100 social-btn">
                                                                <img src={googleIcon} alt="Google" style={{ width: 20, height: 20 }} />
                                                                <span className="body-md-2 fw-semibold ms-2">Google</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            {showForgot &&
                <ForgotPasswordModal setShowForgot={setShowForgot} setShowLogin={setShowLogin}/>
            }
            {/* REGISTER MODAL */}
            {showRegister &&
                <RegisterModal setShowRegister={setShowRegister} setShowLogin={setShowLogin}/>
            }
        </div>
    );
}
