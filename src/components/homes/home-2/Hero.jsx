import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {PackagePlus, Warehouse, Briefcase} from 'lucide-react';
import BannerImage1 from '/images/banner/banner-31.webp'
import MainItem1 from '/images/item/camera-4.png'
import LoadingDots from "@/components/custom/loadingDots.jsx";
import {getImageUrl} from "@/utlis/util.js";
import {useContextElement} from "@/context/Context.jsx";
import {useDealersTopRated} from "@/hooks/useDealers.js";
import {getJobsHiring} from "@/api/jobs.js";
import {StarRating} from "@/components/custom/starRating.jsx";
import AddToCart from "@/components/common/AddToCart.jsx";
import AddToWishlist from "@/components/common/AddToWishlist.jsx";
import AddToCompare from "@/components/common/AddToCompare.jsx";

export default function Hero() {
    const {data, loading, error} = useDealersTopRated();
    const [isLoading, setIsLoading] = useState(false)

    const {currentUser} = useContextElement();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                const result = await getJobsHiring();
                if (result) {
                    setJobs(result.data); // <-- set the state here
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

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
                                                        <span className="new-price price-text text-primary cs-pointer fw-medium">
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
                        <div className="d-grid">
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
                            className='d-flex justify-content-center align-items-center gap-1 text-white text-uppercase fw-bold'>
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
                </div>
            </div>
        </section>
    );
}
