import BrandsSlider from "@/components/common/BrandsSlider";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Description from "@/components/product-detail/Description";
import Details8 from "@/components/product-detail/Details8";
import RelatedProducts from "@/components/product-detail/Relatedproducts";
import React from "react";
import {Link, useParams} from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import {useDealerById} from "@/hooks/useDealers.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";

const metadata = {
    title: "Product Details || MediaStore - MultiMedia eCommerce Website",
    description: "MediaStore - MultiMedia eCommerce Website",
};
export default function DealerDetails() {
    const { id } = useParams(); // 👈 catch ID from URL
    const { data, loading, error } = useDealerById(id);

    if (loading) return <LoadingDots />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <MetaComponent meta={metadata} />
            <Header4 />
            <div className="tf-sp-1">
                <div className="container">
                    <ul className="breakcrumbs">
                        <li>
                            <Link to={`/`} className="body-small link">
                                {" "}
                                Home{" "}
                            </Link>
                        </li>
                        <li className="d-flex align-items-center">
                            <i className="icon icon-arrow-right" />
                        </li>
                        <li>
                            <Link to={`/product-grid`} className="body-small link">
                                {" "}
                                Shop{" "}
                            </Link>
                        </li>
                        <li className="d-flex align-items-center">
                            <i className="icon icon-arrow-right" />
                        </li>
                        <li>
                            <span className="body-small">Product Detail</span>
                        </li>
                    </ul>
                </div>
            </div>
            <Details8 postDetails={data} />

            {/* review */}
            {/*<Description />*/}

            {/*<SimilerProducts />*/}
            <RelatedProducts categoryId={data.category_id} subCategoryId={data.subcategory_id} />
            <BrandsSlider />
            {/*<RecentProducts />*/}
            <Footer1 />
        </>
    );
}
