import React, {useState} from "react";
import {login} from "@/api/auth.js";
import {useContextElement} from "@/context/Context.jsx";

import facebookIcon from '../../../public/icons/social/fb.svg'
import googleIcon from '../../../public/icons/social/google.svg'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const { setCurrentUser, setAuthToken, currentUser,  authToken, logout } = useContextElement();

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
                res = await login({ email, password });
            } else {
                console.log("Logging in as User", { email, password });
                res = await login({ email, password });
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
    <>
        { showLogin &&
            <div className="modal modalCentered fade modal-log" id="log">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
          <span
              className="icon icon-close "
              data-bs-dismiss="modal"
              onClick={() => setShowLogin(false)}
          />

                        { currentUser ?
                            (
                                <div className="modal-log-wrap list-file-delete">
                                    <h5 className="title fw-semibold">Welcome!</h5>
                                    <div className="form-content text-center">
                                        <p className="body-md-2">
                                            Hello, <strong>{currentUser.name}</strong>
                                        </p>
                                        <button
                                            className="tf-btn w-100 mt-3"
                                            onClick={() => {
                                                const confirmLogout = window.confirm("Are you sure you want to logout?");
                                                if (confirmLogout) logout(); // only call logout if confirmed
                                            }}
                                        >
                                            Logout
                                        </button>

                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="modal-log-wrap list-file-delete">
                                    <h5 className="title fw-semibold">Log In</h5>

                                    {/* Role Tabs */}
                                    <div className="login-role-tabs d-flex justify-content-center mb-3">
                                        <button
                                            type="button"
                                            className={`role-tab ${role === "user" ? "active" : ""}`}
                                            onClick={() => setRole("user")}
                                        >
                                            Login as User
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

                                            <a href="#" className="link text-end body-text-3">
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
                                            <a href="#register" data-bs-toggle="modal" className="fw-bold ms-2">
                                                Register
                                            </a>
                                        </p>
                                    </form>
                                    <div className="orther-log text-center">
                                        <span className="br-line bg-gray-5" />
                                        <p className="caption text-main-2">Or login with</p>
                                    </div>

                                    <ul className="list-log">
                                        <li>
                                            <a href="#" className="tf-btn-primary btn-line w-100 social-btn">
                                                <img
                                                    src={facebookIcon}
                                                    alt="Facebook"
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <span className="body-md-2 fw-semibold ms-2">Facebook</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tf-btn-primary btn-line w-100 social-btn">
                                                <img
                                                    src={googleIcon}
                                                    alt="Google"
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <span className="body-md-2 fw-semibold ms-2">Google</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )

                        }
                    </div>
                </div>
            </div>
        }
    </>
  );
}

