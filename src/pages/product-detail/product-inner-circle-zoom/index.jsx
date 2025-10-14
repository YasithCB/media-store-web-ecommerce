import BrandsSlider from "@/components/common/BrandsSlider";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Description from "@/components/product-detail/Description";
import Details8 from "@/components/product-detail/Details8";
import Relatedproducts from "@/components/product-detail/Relatedproducts";
import React from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import {usePostsById} from "@/hooks/usePosts.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";

const metadata = {
  title: "Product Details || MediaStore - MultiMedia eCommerce Website",
  description: "MediaStore - MultiMedia eCommerce Website",
};
export default function ProductInnerCircleZoomPage() {
    const { id } = useParams(); // 👈 catch ID from URL
    const { data, loading, error } = usePostsById(id);


    if (loading) return <LoadingDots />;
    if (error) return <p>Error: {error}</p>;

    console.log("Fetched product:", data);

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
      <Description />
      {/*<SimilerProducts />*/}
      <Relatedproducts categoryId={data.category_id} subCategoryId={data.subcategory_id} />
      <BrandsSlider />
      {/*<RecentProducts />*/}
      <Footer1 />
    </>
  );
}
