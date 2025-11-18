import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {PackagePlus, Warehouse, Briefcase, Package} from 'lucide-react';
import BannerImage1 from '/images/banner/banner-31.webp'
import MainItem1 from '/images/item/camera-4.png'
import LoadingDots from "@/components/custom/loadingDots.jsx";
import {getImageUrl} from "@/utlis/util.js";
import {useContextElement} from "@/context/Context.jsx";
import {useDealersTopRated} from "@/hooks/useDealers.js";
import {getJobsHiring} from "@/api/jobs.js";
import {getOrdersByDealer} from "@/api/dealers.js";

export default function Hero() {
    const {data, loading, error} = useDealersTopRated();
    const [isLoading, setIsLoading] = useState(false)

    const {currentUser, userRole} = useContextElement();
    const [jobs, setJobs] = useState([]);
    const [dealerOrders, setDealerOrders] = useState([]);
    const [pendingDealerOrders, setPendingDealerOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const jobData = await getJobsHiring();

                if (userRole === 'dealer') {
                    const dealerOrderData = await getOrdersByDealer(currentUser.id);
                    setDealerOrders(dealerOrderData.data);

                    const pending = dealerOrderData.data.filter(order => order.status === "PENDING");
                    setPendingDealerOrders(pending);
                }

                if (jobData) {
                    setJobs(jobData.data); // <-- set the state here
                }

            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userRole]);

    if (loading || isLoading || jobs.isEmpty) return <LoadingDots/>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section
            className="has-bg-img"
            style={{backgroundImage: `url(${BannerImage1})`}}
        >
            <div className="container">
                <div className="banner-product flex-xl-nowrap justify-content-center">

                    {/* LEFT COL */}
                    <div className="col d-flex flex-column col-12 col-lg">
                        <div
                            className='d-flex justify-content-center align-items-center gap-1 text-white text-uppercase fw-bold mb-3'>
                            <Briefcase size={17}/>
                            <p>Top Jobs for You | Share CV Now!</p>
                        </div>

                        <div className="row d-flex">
                            {jobs.slice(0, 4).map((product) => (
                                <li key={product.id} className='col-6 col-lg-12 mb-2'>
                                    <div className="card-product style-row row-small-2">

                                        <div className="card-product-wrapper">
                                            <Link
                                                to={`/product-detail/${product.id}`}
                                                className="product-img"
                                            >
                                                <img
                                                    className="img-product lazyload"
                                                    src={getImageUrl(product.logo)}
                                                    alt={`Studio-0${product.id}`}
                                                    width={100}
                                                    height={100}
                                                />
                                                <img
                                                    className="img-hover lazyload"
                                                    src={getImageUrl(product.logo)}
                                                    alt={`Studio-0${product.id}`}
                                                    width={100}
                                                    height={100}
                                                />
                                            </Link>
                                        </div>

                                        <div className="card-product-info">
                                            <div>
                                                <div className="relative z-5">
                                                    <p className="caption text-white font-2">
                                                        {product.subcategory_title}
                                                    </p>
                                                    <Link
                                                        to={`/product-detail/${product.id}`}
                                                        className="name-product body-md-2 fw-semibold text-white text-uppercase link"
                                                    >
                                                        {product.title}
                                                    </Link>
                                                    <p className="caption text-white font-2">
                                                        {product.job_type}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="mb-1 price-wrap fw-medium">
                                                        <span
                                                            className="new-price price-text text-primary cs-pointer fw-medium">
                                                            {parseFloat(product.salary).toFixed(2)}AED
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* MID COL */}
                    <div className="product-wrap hover-img d-flex flex-column col-12 col-lg">
                        <Link
                            to={`/shop-fullwidth`}
                            className="item-product d-flex justify-content-center img-style"
                        >
                            <img
                                src={MainItem1}
                                alt=""
                                className="lazyload"
                                style={{width: '85%'}}
                            />
                        </Link>

                        <div className="info-product text-md-start">
                            <div className="box-title text-center">
                                <p className="tag-new text-white text-uppercase title-sidebar">
                                    New arrival
                                </p>
                                <h1 className="name">
                                    <Link
                                        to={`/shop-fullwidth`}
                                        className="text-white text-uppercase link"
                                    >
                                        Camera &amp; <br/>
                                        <span className="fw-8"> Lenses </span>
                                    </Link>
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* right col */}
                    <div className="other-item flex-xl-column flex-md-row">
                        {userRole !== 'dealer' ?

                            // TOP 4 DEALERS
                            <div>
                                {/* ADD POST */}
                                <div className="d-grid mb-2">
                                    <button className="btn bg-primary text-secondary fw-semibold w-100">
                                        <PackagePlus/>
                                        {" "}Login as Dealer | Add Your post FREE
                                    </button>
                                </div>

                                <div
                                    className='d-flex justify-content-center align-items-center gap-1 text-white text-uppercase fw-bold mb-3'>
                                    <Warehouse size={17}/>
                                    <p>Top 4 Dealers</p>
                                </div>

                                <div className="row g-1 px-2 px-lg-0">
                                    {data.slice(0, 4).map((dealer) => (
                                        <div key={dealer.id} className="col-6 d-flex px-1">
                                            <div
                                                className="card border-0 rounded-4 w-100 text-center p-2 shadow-sm hover-card"
                                                style={{
                                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                }}
                                            >
                                                {/* Centered Image */}
                                                <Link to={`/dealer-detail/${dealer.id}`}>
                                                    <img
                                                        src={getImageUrl(dealer.logo || "")}
                                                        alt={dealer.title}
                                                        className="img-fluid"
                                                        style={{
                                                            height: "100px",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </Link>

                                                {/* Title + Subtitle */}
                                                <div className="mt-3">
                                                    <p className="text-muted small mb-0 fs-10">
                                                        {dealer.subcategory_title}
                                                    </p>

                                                    <Link
                                                        to={`/product-detail/${dealer.id}`}
                                                        className="fw-semibold text-dark text-decoration-none"
                                                    >
                                                        {dealer.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            :
                            // YOUR ORDERS - FOR DEALER
                            <div>
                                {/* ADD POST */}
                                <div className="d-grid mb-2">
                                    {currentUser ?
                                        <Link to={`/add-post`} className="body-small link">
                                            <button className="btn bg-primary text-secondary fw-semibold w-100">
                                                <PackagePlus/>
                                                {" "}Add Your post for FREE
                                            </button>
                                        </Link>
                                        :
                                        <button className="btn bg-primary text-secondary fw-semibold w-100">
                                            <PackagePlus/>
                                            {" "}Login to Add Your post for FREE
                                        </button>
                                    }
                                </div>

                                <div
                                    className='d-flex justify-content-center align-items-center gap-2 text-dark fw-bold my-2'>
                                    <Package className='text-white' size={20}/>
                                    <p className="text-white mb-0 text-uppercase">PENDING ORDERS | READY NOW</p>
                                </div>

                                { pendingDealerOrders.length === 0 &&
                                    <p className='text-white text-center'>
                                        No Orders Yet!
                                    </p>
                                }

                                <div className="row g-3">
                                    {pendingDealerOrders.slice(0, 4).map((order) => {
                                        const product = order.product;

                                        return (
                                            <div key={order.id} className="card shadow-sm rounded-3 border-0">
                                                <div className="row g-0 align-items-center p-2">
                                                    {/* Image */}
                                                    <div className="col-3 col-md-2">
                                                        <Link to={`/product-detail/${product.id}`}>
                                                            <img
                                                                src={getImageUrl(product.photos?.[0] || "")}
                                                                alt={product.title}
                                                                className="img-fluid rounded"
                                                                style={{
                                                                    height: "80px",
                                                                    objectFit: "cover",
                                                                    width: "100%"
                                                                }}
                                                            />
                                                        </Link>
                                                    </div>

                                                    {/* Details */}
                                                    <div className="col-9 col-md-10 ps-3">
                                                        <Link
                                                            to={`/product-detail/${product.id}`}
                                                            className="fw-semibold text-dark text-decoration-none d-block text-truncate"
                                                            title={product.title}
                                                        >
                                                            {product.title}
                                                        </Link>

                                                        <div className="d-flex flex-wrap gap-2 mt-1 align-items-center">
                                                            <span
                                                                className="badge bg-primary text-dark">Qty: {order.quantity}</span>
                                                            <span className="text-muted small">
                                                                {new Date(order.created_at).toLocaleString(undefined, {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true
                                                                })}
                                                            </span>

                                                            <span className="badge bg-warning text-dark">{order.status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );

                                    })}
                                </div>

                                <Link to={`/dealer-orders`} state={{dealerOrders}} className="body-small link mt-2 w-100">
                                    <button className="btn bg-white text-secondary fw-semibold w-100">
                                        <Package className='me-1' />
                                        {" "}Manage Orders
                                    </button>
                                </Link>
                            </div>

                        }

                    </div>
                </div>
            </div>
        </section>
    );
}
