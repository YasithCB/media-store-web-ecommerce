import Features2 from "@/components/common/Features2";
import RecentProducts from "@/components/common/RecentProducts";
import Footer1 from "@/components/footers/Footer1";

import OrderDetails from "@/components/shop-cart/OrderDetails";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Header2 from "@/components/headers/Header2.jsx";

const metadata = {
  title: "Order Details || MediaStore - MultiMedia eCommerce Website",
  description: "MediaStore - MultiMedia eCommerce Website",
};
export default function OrderDetailsPage() {

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-sp-3 pb-0">
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
              <span className="body-small"> Order Detail</span>
            </li>
          </ul>
        </div>
      </div>

      <OrderDetails />

      <RecentProducts />
      <Features2 />
      <Footer1 />
    </>
  );
}
