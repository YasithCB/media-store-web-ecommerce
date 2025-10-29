import Footer1 from "@/components/footers/Footer1";
import Wishlist from "@/components/shop-cart/Wishlist";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import Header2 from "@/components/headers/Header2.jsx";

const metadata = {
    title: "My Orders | MediaStore",
    description: "MediaStore - MultiMedia eCommerce Website",
};
export default function MyOrdersPage() {
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
                            <span className="body-small"> My Orders</span>
                        </li>
                    </ul>
                </div>
            </div>

            <Wishlist />
            <Footer1 />
        </>
    );
}
