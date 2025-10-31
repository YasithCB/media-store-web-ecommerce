import React, { useEffect, useState } from "react";
import { Globe } from 'lucide-react';
import { Link } from "react-router-dom";

export default function BlogGrid() {
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

    return (
        <>
            <section>
                <div className="container">
                    <h5 className="fw-semibold flat-title-has-icon mb-4">
                      <span className="icon">
                         <Globe />
                      </span>
                      Trending in Media & Advertising
                    </h5>


                    <div className="d-flex gap-36">
                        <div className="tf-grid-layout sm-col-2 md-col-3">
                            {articles.map((post, index) => (
                                <div className="news-item hover-img" key={index}>
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
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
