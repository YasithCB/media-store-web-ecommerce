import {Link} from "react-router-dom";
import {useContextElement} from "@/context/Context";
import {getImageUrl} from "@/utlis/util.js";

export default function Compare() {
    const {compareItem, removeFromCompareItem, setCompareItem} = useContextElement();

    return (
        <div className="offcanvas offcanvas-bottom offcanvas-compare" id="compare">
            <div className="offcanvas-content">
                <div className="header">
                    <span className="icon-close icon-close-popup link" data-bs-dismiss="offcanvas"/>
                </div>

                <div className="wrap">
                    <div className="container">
                        <div className="tf-compare-list">
                            <h5 className="title fw-semibold">
                                Compare <br className="d-none d-md-block"/> Products
                            </h5>

                            {!compareItem.length ? (
                                <div className="mini-compare-empty w-100 text-center">
                                    <h6>Your compare is currently empty</h6>
                                </div>
                            ) : (
                                <div className="tf-compare-wrap">
                                    {compareItem.map((product) => (
                                        <div key={product.id} className="tf-compare-item">
                      <span
                          className="icon-close remove"
                          onClick={() => removeFromCompareItem(product.id)}
                      />

                                            <Link to={`/product-detail/${product.id}`} className="image">
                                                <img
                                                    className="lazyload"
                                                    src={getImageUrl(product.photos?.[0] || "")}
                                                    alt={product.title}
                                                    width={500}
                                                    height={500}
                                                />
                                            </Link>

                                            <div className="content">
                                                <Link
                                                    className="text-line-clamp-2 body-md-2 fw-semibold text-secondary link"
                                                    to={`/product-detail/${product.id}`}
                                                >
                                                    {product.title}
                                                </Link>
                                                <p className="price-wrap fw-medium">
                          <span className="new-price price-text fw-medium">
                            {product.price != null && !isNaN(product.price)
                                ? parseFloat(product.price).toFixed(2)
                                : "N/A"}{" "}
                              AED
                          </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="tf-compare-buttons">
                                <div className="tf-compare-btn">
                                    <Link to={`/compare`} className="tf-btn btn-gray btn-large-3">
                                        <span className="text-white">Compare Products</span>
                                    </Link>
                                    <div
                                        className="tf-btn-dark cs-pointer clear-file-delete link btn-large-3"
                                        onClick={() => setCompareItem([])}
                                    >
                                        <span className="text-white">Clear All Products</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
