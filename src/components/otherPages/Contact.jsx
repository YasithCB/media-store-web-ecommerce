import React, {useRef, useState} from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import LoadingDots from "@/components/custom/loadingDots.jsx";

export default function Contact() {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            await Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "We'll get back to you soon.",
                confirmButtonColor: "#000",
            });

            formRef.current.reset();
        } catch (err) {
            console.error("EmailJS error:", err);
            await Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again later.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
    <section className="tf-sp-2">
      <div className="container">
          <div className="wg-map">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.5151588227363!2d54.37124937599515!3d24.467601260864065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e66237e20bb83%3A0x8b054a249342fafe!2sMedia%20Store!5e0!3m2!1sen!2sae!4v1761920282943!5m2!1sen!2sae"
                  height={585}
                  style={{borderRadius: 8, width: "100%"}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="bottom">
                  <div className="contact-info">
                      <h5 className="fw-semibold">Contact Infomation</h5>
                      <ul className="info-list">
                          <li>
                  <span className="icon">
                    <i className="icon-location"/>
                  </span>
                              <a
                                  href="https://www.google.com/maps?q=8500%20Lorem%20StreetChicago"
                                  className="link"
                                  target="_blank"
                              >
                                  Airport Road, <br/>
                                  Abu Dhabi, UAE
                              </a>
                          </li>
                          <li>
                  <span className="icon">
                    <i className="icon-phone"/>
                  </span>
                              <a
                                  href="tel:1234567"
                                  className="product-title fw-semibold link"
                              >
                                  <span>+971 50 2 30 31 30</span>
                              </a>
                          </li>
                          <li>
                  <span className="icon">
                    <i className="icon-direction"/>
                  </span>
                              <a href="mailto:info@mediastore.com" className="link">
                                  <span>info@mediastore.com</span>
                              </a>
                          </li>
                      </ul>
                  </div>

                  <div className="contact-wrap border-secondary">
                      <div className="box-title">
                          <h5 className="fw-semibold">Get A Quote</h5>
                          <p className="body-text-3">
                              Fill up the form and our Team will get back to you within 24
                              hours.
                          </p>
                      </div>
                      <form ref={formRef} onSubmit={handleSubmit} className="form-contact def">
                          <fieldset>
                              <label>Name</label>
                              <input type="text" name="user_name" required />
                          </fieldset>

                          <fieldset>
                              <label>Email</label>
                              <input type="email" name="user_email" required />
                          </fieldset>

                          <fieldset>
                              <label>Mobile</label>
                              <input type="tel" name="user_phone" pattern="[0-9+\-() ]+" required />
                          </fieldset>

                          <fieldset>
                              <label>Subject</label>
                              <input type="text" name="subject" required />
                          </fieldset>

                          <fieldset className="d-flex flex-column">
                              <label>Your message</label>
                              <textarea
                                  name="message"
                                  style={{ height: 170 }}
                                  required
                                  placeholder="Write your message here..."
                              ></textarea>
                          </fieldset>

                          {!loading ?
                              <div className="box-btn-submit">
                                  <button
                                      type="submit"
                                      className="tf-btn-dark text-white w-100"
                                      disabled={loading}
                                  >
                                      {loading ? "Sending..." : "Send Message"}
                                  </button>
                              </div>
                              :
                              <LoadingDots/>
                          }
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
}
