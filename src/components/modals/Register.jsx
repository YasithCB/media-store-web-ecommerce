import React, {useState} from "react";
import {useContextElement} from "@/context/Context.jsx";
import {signup} from "@/api/auth.js";

export default function Register() {
    const { login } = useContextElement(); // function to update context after signup
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Example API call — replace with your backend endpoint
            const res = await signup({name, email, phone, password});

            console.log('resp : register')
            console.log(res)

            if (res.status === 'success') {
                // show message instead of auto-login
                setSuccess("Registration successful! You can now log in.");
                setName("");
                setEmail("");
                setPassword("");
                setPhone("");
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
            <div className="orther-log text-center">
              <span className="br-line bg-gray-5" />
              <p className="caption text-main-2">Or login with</p>
            </div>
            <ul className="list-log">
              <li>
                <a href="#" className="tf-btn-primary btn-line w-100">
                  <i className="icon icon-facebook-2" />
                  <span className="body-md-2 fw-semibold">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="tf-btn-primary btn-line w-100">
                  <i className="icon icon-google" />
                  <span className="body-md-2 fw-semibold">Google</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
