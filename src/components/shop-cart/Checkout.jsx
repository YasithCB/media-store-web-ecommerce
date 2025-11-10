import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {useContextElement} from "@/context/Context";
import {getImageUrl} from "@/utlis/util.js";
import {createCharge} from "@/api/payment.js";
import Swal from "sweetalert2";
export const gulfCountries = [
    {
        name: "United Arab Emirates",
        code: "AE",
        cities: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"]
    },
    {
        name: "Saudi Arabia",
        code: "SA",
        cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Al-Ahsa", "Tabuk"]
    },
    {
        name: "Kuwait",
        code: "KW",
        cities: ["Kuwait City", "Al Ahmadi", "Hawalli", "Al Farwaniyah", "Al Jahra", "Mubarak Al-Kabeer"]
    },
    {
        name: "Qatar",
        code: "QA",
        cities: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Al Shamal", "Al Daayen"]
    },
    {
        name: "Oman",
        code: "OM",
        cities: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Rustaq", "Ibri"]
    },
    {
        name: "Bahrain",
        code: "BH",
        cities: ["Manama", "Muharraq", "Riffa", "Isa Town", "Sitra", "Hamad Town"]
    }
];

export function Checkout() {
    const {cartProducts, totalPrice, currentUser} = useContextElement();
    const [loading, setLoading] = useState(false);
    const [tokenId, setTokenId] = useState('');
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [orderNote, setOrderNote] = useState("");

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const country = gulfCountries.find(c => c.code === selectedCountry);

    useEffect(() => {
        const configureCardSDK = async () => {
            const {renderTapCard, Theme, Currencies, Direction, Edges, Locale} = window.CardSDK
            const {unmount} = renderTapCard('card-sdk-id', {
                publicKey: 'pk_test_nx0SMQFNreyZXchYHvKft7wg', // Tap's public key
                merchant: {
                    id: '67993052'
                },
                transaction: {
                    amount: totalPrice,
                    currency: Currencies.AED
                },
                acceptance: {
                    supportedBrands: ['VISA', 'MASTERCARD', 'MADA'], //Remove the ones that are NOT enabled on your Tap account
                    supportedCards: "ALL" //To accept both Debit and Credit
                },
                fields: {
                    cardHolder: true
                },
                addons: {
                    displayPaymentBrands: true,
                    loader: true,
                    saveCard: true
                },
                interface: {
                    locale: Locale.EN,
                    theme: Theme.LIGHT,
                    edges: Edges.CURVED,
                    direction: Direction.LTR
                },
                onReady: () => {
                },
                onFocus: () => {
                },
                onBinIdentification: () => {
                },
                onValidInput: () => {
                },
                onInvalidInput: () => {
                },
                onError: (data) => console.log('onError', data),
                onSuccess: async (data) => {
                    console.log('OnSuccess', data)
                    setTokenId(data.id)
                },
                onChangeSaveCardLater: (isSaveCardSelected) => {
                } // isSaveCardSelected:boolean
            })
        }

        configureCardSDK()
    }, []);

    const validateCheckoutForm = () => {
        if (!firstName.trim()) return "Please enter your first name.";
        if (!lastName.trim()) return "Please enter your last name.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Please enter a valid email address.";
        if (!mobile.trim() || !/^[0-9]{7,15}$/.test(mobile))
            return "Please enter a valid mobile number.";
        if (!selectedCountry) return "Please select your country.";
        if (!selectedCity) return "Please select your city.";
        if (!address.trim()) return "Please enter your address.";
        if (!zipcode.trim()) return "Please enter your zip code.";
        if (cartProducts.length === 0)
            return "Your cart is empty. Please add some items before proceeding.";
        return null; // ✅ all good
    };

    const handlePlaceOrder = async () => {
        const validationError = validateCheckoutForm();
        if (validationError) {
            await Swal.fire({
                icon: "warning",
                title: "Incomplete Details",
                text: validationError,
                confirmButtonColor: "#212529",
                iconColor: '#212529'
            });
            return;
        }

        try {
            setLoading(true);

            // ⏳ tokenize the card and wait
            await window.CardSDK.tokenize();

            // ⏳ wait for 1 second before createCharge
            await new Promise(resolve => setTimeout(resolve, 3000));

            // now safely use tokenResponse.id
            const createChargeResp = await createCharge({
                amount: totalPrice,
                token_id: tokenId,
                description: orderNote,
                order_id: tokenId,
                customer_name: `${firstName} ${lastName}`,
                customer_email: email,
                customer_phone: mobile,
            });

            // redirect to Tap payment page
            window.location.href = createChargeResp.data.transaction.url;
        } catch (err) {
            console.error("Payment error:", err);
            await Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: "Something went wrong during payment. Please try again.",
                confirmButtonColor: "#212529",
            });
        } finally {
            // ⏳ wait for 1 second before createCharge
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        }
    };


    return (
        <section className="tf-sp-2">
            <div className="container">
                <div className="checkout-status tf-sp-2 pt-0">
                    <div className="checkout-wrap">
                        <span className="checkout-bar next"/>
                        <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-1"/>
              </span>
                            <Link to={`/shop-cart`} className="link body-text-3">
                                Shopping Cart
                            </Link>
                        </div>
                        <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-2"/>
              </span>
                            <Link
                                to={`/checkout`}
                                className="text-secondary link body-text-3"
                            >
                                Shopping &amp; Checkout
                            </Link>
                        </div>
                        <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-3"/>
              </span>
                            <Link to={`/order-details`} className="link body-text-3">
                                Confirmation
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tf-checkout-wrap flex-lg-nowrap">
                    <div className="page-checkout">
                        <div className="wrap">
                            <h5 className="title has-account">
                                <span className="fw-semibold">Contact</span>
                            </h5>
                            <form action="#" className="form-checkout-contact">
                                <label className="body-md-2 fw-semibold">Email</label>
                                <input
                                    className="def"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                    required
                                />

                                <label className="body-md-2 fw-semibold">Mobile</label>
                                <input
                                    type="tel"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Enter your mobile number"
                                    required
                                    pattern="[0-9]{7,15}"
                                />
                                <p className="caption text-main-2 font-2">
                                    Order information will be sent to your email
                                </p>
                            </form>
                        </div>
                        <div className="wrap">
                            <h5 className="title fw-semibold">Delivery</h5>
                            <form action="#" className="def">
                                <div className="cols">
                                    <fieldset>
                                        <label>Country</label>
                                        <div className="tf-select">
                                            <select value={selectedCountry}
                                                    onChange={e => setSelectedCountry(e.target.value)}>
                                                <option value="">Select your Country</option>
                                                {gulfCountries.map(c => (
                                                    <option key={c.code} value={c.code}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <label>State</label>
                                        <div className="tf-select">
                                            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                                                    disabled={!selectedCountry}>
                                                <option value="">Select City</option>
                                                {country?.cities.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="cols">
                                    <fieldset>
                                        <label>First name</label>
                                        <input
                                            className="def"
                                            type="text"
                                            placeholder="e.g John"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <label>Last name</label>
                                        <input
                                            className="def"
                                            type="text"
                                            placeholder="e.g Doe"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </fieldset>
                                </div>

                                <div className="cols">
                                    <fieldset>
                                        <label>Address</label>
                                        <input
                                            className="def"
                                            type="text"
                                            placeholder="Your address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label>ZIP code</label>
                                        <input
                                            className="def"
                                            type="text"
                                            placeholder="e.g 12345"
                                            value={zipcode}
                                            onChange={(e) => setZipcode(e.target.value)}
                                            required
                                        />
                                    </fieldset>
                                </div>

                                <fieldset>
                                    <label>Order note</label>
                                    <textarea
                                        placeholder="Note on your order"
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                    />
                                </fieldset>

                                <h5 className="title fw-semibold">Payment</h5>
                                <div className="col-12 col-md-6">
                                    <div id="card-sdk-id" className='mb-4'></div>
                                </div>

                                <div className="box-btn">
                                    <button
                                        className="tf-btn-dark w-100"
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                    >
                                        <span className="text-white">
                                          {loading ? "Processing..." : "Place Order & Pay"}
                                        </span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="flat-sidebar-checkout">
                        <div className="sidebar-checkout-content">
                            <h5 className="fw-semibold">Order Summary</h5>
                            {cartProducts.length ? (
                                <ul className="list-product">
                                    {cartProducts.map((product, i) => (
                                        <li key={i} className="item-product">
                                            <a href="#" className="img-product">
                                                <img
                                                    alt=""
                                                    src={getImageUrl(product.photos?.[0] || "")}
                                                    width={500}
                                                    height={500}
                                                />
                                            </a>
                                            <div className="content-box">
                                                <a
                                                    href="#"
                                                    className="link-secondary body-md-2 fw-semibold"
                                                >
                                                    {product.title}
                                                </a>
                                                <p className="price-quantity price-text fw-semibold">
                                                    {product.price != null && !isNaN(product.price)
                                                        ? parseFloat(product.price).toFixed(2)
                                                        : "N/A"} AED
                                                    <span className="body-md-2 text-main-2 fw-normal">
                                                       {" "}X{product.quantity}
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4">
                                    <div className="col-4">
                                        Your Cart is empty. Start adding favorite products to cart!{" "}
                                    </div>
                                    <Link
                                        className="tf-btn mt-2 mb-3 text-white"
                                        style={{width: "fit-content"}}
                                        to={'/shop-fullwidth'}>
                                        Explore Products
                                    </Link>
                                </div>
                            )}
                            <div className="">
                                <p className="body-md-2 fw-semibold sub-type">Discount code</p>
                                <form action="#" className="ip-discount-code style-2">
                                    <input
                                        type="text"
                                        className="def"
                                        placeholder="Your code"
                                        required=""
                                    />
                                    <button type="submit" className="tf-btn btn-gray-2">
                                        <span>Apply</span>
                                    </button>
                                </form>
                            </div>
                            <ul className="sec-total-price">
                                <li>
                                    <span className="body-text-3">Sub total</span>
                                    <span className="body-text-3">{totalPrice.toFixed(2)} AED</span>
                                </li>
                                <li>
                                    <span className="body-text-3">Shipping</span>
                                    <span className="body-text-3">Free shipping</span>
                                </li>
                                <li>
                                    <span className="body-md-2 fw-semibold">Total</span>
                                    <span className="body-md-2 fw-semibold text-third">
                                        {totalPrice.toFixed(2)} AED
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
