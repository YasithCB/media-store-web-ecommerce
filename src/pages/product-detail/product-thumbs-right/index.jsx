import BrandsSlider from "@/components/common/BrandsSlider";
import RecentProducts from "@/components/common/RecentProducts";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";

import Description2 from "@/components/product-detail/Description2";

import Details2 from "@/components/product-detail/Details2";
import Relatedproducts from "@/components/product-detail/Relatedproducts";
import SimilerProducts from "@/components/product-detail/SimilerProducts";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Product Details || MediaStore - MultiMedia eCommerce Website",
  description: "MediaStore - MultiMedia eCommerce Website",
};
export default function ProductThumbsRightPage() {
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
              <span className="body-small">
                Product Detail Right Thumbsnail
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Details2 />
      <Description2 />
      <SimilerProducts />
      <Relatedproducts />
      <BrandsSlider />
      <RecentProducts />
      <Footer1 />
    </>
  );
}
