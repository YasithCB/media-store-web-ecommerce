import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {Globe} from "lucide-react";
import {Link} from "react-router-dom";

export default function Blogs() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(
                    `https://newsapi.org/v2/everything?q=media%20industry%20OR%20film%20OR%20advertising&language=en&pageSize=10&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
                );
                const data = await res.json();
                setArticles(data.articles || []);
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p className="text-center py-5">Loading news...</p>;

    if (!articles.length)
        return (
            <p className="text-center py-5 text-muted">
                No news available right now. Please check back later.
            </p>
        );

    return (
        <section className="tf-sp-2">
            <div className="container">
                <div className="flat-title wow fadeInUp" data-wow-delay="0s">

                    <h5 className="fw-semibold flat-title-has-icon ">
                      <span className="icon">
                         <Globe />
                      </span>
                        Global Media Insights
                    </h5>

                    <div className="box-btn-slide relative">
                        <div className="swiper-button-prev nav-swiper nav-prev-products snbp65">
                            <i className="icon-arrow-left-lg" />
                        </div>
                        <div className="swiper-button-next nav-swiper nav-next-products snbn65">
                            <i className="icon-arrow-right-lg" />
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{
                        clickable: true,
                        el: ".spd65",
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = ".snbp65";
                        swiper.params.navigation.nextEl = ".snbn65";
                    }}
                    className="swiper tf-sw-products"
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        575: { slidesPerView: 2 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        992: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    spaceBetween={15}
                >
                    {articles.map((post, index) => (
                        <SwiperSlide className="swiper-slide" key={index}>
                            <div className="news-item hover-img">
                                <Link to={post.url} target="_blank" className="entry_image img-style">
                                    <img
                                        src={post.urlToImage || "/images/default-news.jpg"}
                                        alt={post.title}
                                        className="lazyload"
                                        width={555}
                                        height={312}
                                    />
                                </Link>
                                <div className="content">
                                    <div className="entry_meta">
                                        <div className="tags">
                                            <img
                                                alt=""
                                                src="/images/folder.svg"
                                                width={16}
                                                height={16}
                                            />
                                            <p className="caption fw-medium text-secondary font-2">
                                                {post.source.name}
                                            </p>
                                        </div>
                                        <div className="date">
                                            <p className="caption font-2">
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="entry_infor_news">
                                        <h6>
                                            <a href={post.url} target="_blank" className="link fw-semibold">
                                                {post.title}
                                            </a>
                                        </h6>
                                        <p className="subs body-text-3">
                                            {post.description?.slice(0, 120) || "No summary available..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="d-flex d-xl-none sw-dot-default sw-pagination-products justify-content-center spd65" />
                </Swiper>
            </div>
        </section>
    );
}
