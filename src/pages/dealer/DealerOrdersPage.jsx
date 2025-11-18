import Footer1 from "@/components/footers/Footer1";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import Header2 from "@/components/headers/Header2.jsx";
import Topbar1 from "@/components/headers/Topbar1.jsx";
import DealerOrders from "@/components/dealer/DealerOrders.jsx";

const metadata = {
    title: "Order Details | MediaStore",
    description: "MediaStore - MultiMedia eCommerce Website",
};
export default function DealerOrdersPage() {
    const location = useLocation();
    const { dealerOrders } = location.state || {};

    console.log('dealerOrders')
    console.log(dealerOrders)

    return (
        <>
            <MetaComponent meta={metadata} />
            <Topbar1 parentClass="tf-topbar" />
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
                            <span className="body-small"> Orders</span>
                        </li>
                    </ul>
                </div>
            </div>

            <DealerOrders data={dealerOrders} />
            <Footer1 />
        </>
    );
}
