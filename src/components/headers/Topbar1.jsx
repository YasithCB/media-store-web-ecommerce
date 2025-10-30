import React from "react";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import {useContextElement} from "@/context/Context.jsx";
import {useNavigate} from "react-router-dom";

export default function Topbar1({parentClass = "tf-topbar line-bt"}) {
    const {currentUser} = useContextElement();
    const navigate = useNavigate();

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

                            <div className="tf-cur-item tf-currencies gap-0">
                                <i className="icon icon-budget text-cl-2"/>
                                <div className="tf-curs">
                                    <CurrencySelect topStart/>
                                </div>
                            </div>
                            <div className="tf-cur-item tf-languages gap-0">
                                <i className="icon icon-global text-cl-2"/>
                                <div className="tf-lans">
                                    <LanguageSelect
                                        topStart
                                        parentClassName="image-select center style-default type-lan"
                                    />
                                </div>
                            </div>
                            <a
                                href="#log"
                                data-bs-toggle="modal"
                                className="tf-cur-item link"
                            >
                                <i className="icon-user-3 text-cl-2"/>
                                <span className="body-small text-cl-2">
                    {currentUser ? (
                        <p>Welcome, {currentUser['name']}</p>
                    ) : (
                        <p>Login</p>
                    )}
                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
