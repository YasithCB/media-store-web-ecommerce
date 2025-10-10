import AccountOrders from "@/components/dashboard/AccountOrders";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Account Orders || MediaStore - MultiMedia eCommerce Website",
  description: "MediaStore - MultiMedia eCommerce Website",
};
export default function MyAccountOrdersPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header4 />
      <div className="tf-sp-1 pb-0">
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
              <span className="body-small">Account</span>
            </li>
          </ul>
        </div>
      </div>
      <section className="tf-sp-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="wrap-sidebar-account">
                <ul className="my-account-nav content-append">
                  <Sidebar />
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <AccountOrders />
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
