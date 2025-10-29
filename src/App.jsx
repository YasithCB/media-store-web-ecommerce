import Context from "@/context/Context";

import "photoswipe/dist/photoswipe.css";

import "../public/scss/main.scss";
import { useEffect } from "react";
import WOW from "@/utlis/wow";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "@/components/modals/Cart";
import Login from "@/components/modals/Login";
import Register from "@/components/modals/Register";
import ScrollTop from "@/components/common/ScrollTop";
import Quickview from "@/components/modals/Quickview";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import Toolbar from "@/components/modals/Toolbar";
import Search from "@/components/modals/Search";
import AddParallax from "@/utlis/AddParallax";
import NewsLetter from "@/components/modals/NewsLetter";
import HomePage2 from "./pages/homes/home-2";
import ShopRightSidebarPage from "./pages/shop/shop-right-sidebar";
import ShopFullwidthPage from "./pages/shop/shop-fullwidth";
import ShopCartPage from "./pages/products/shop-cart";
import ComparePage from "./pages/products/compare";
import WishlistPage from "./pages/products/wishlist";
import CheckoutPage from "./pages/products/checkout";
import OrderDetailsPage from "./pages/products/order-details";
import TrackYourOrderPage from "./pages/products/track-your-order";
import MyAccountPage from "./pages/dashboard/my-account";
import ProductThumbsRightPage from "./pages/product-detail/product-thumbs-right";
import ProductThumbsLeftPage from "./pages/product-detail/product-thumbs-left";
import ProductDetailPage2 from "./pages/product-detail/product-detail-2";
import ProductDetailPage3 from "./pages/product-detail/product-detail-3";
import ProductDetailPage4 from "./pages/product-detail/product-detail-4";
import ProductInnerCircleZoomPage from "./pages/product-detail/product-inner-circle-zoom";
import ProductInnerZoomPage from "./pages/product-detail/product-inner-zoom";
import BlogListPage from "./pages/blogs/blog-list";
import BlogGridPage from "./pages/blogs/blog-grid";
import BlogDetailPage from "./pages/blogs/blog-detail";
import ContactPage from "./pages/other-pages/contact";
import AboutPage from "./pages/other-pages/about";
import PrivacyPage from "./pages/other-pages/privacy";
import FaqPage from "./pages/other-pages/faq";
import NotFoundPage from "./pages/other-pages/404";
import MyAccountOrdersPage from "./pages/dashboard/my-account-orders";
import MyAccountAddressPage from "./pages/dashboard/my-account-address";
import MyAccountEditPage from "./pages/dashboard/my-account-edit";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import DealerDetails from "@/pages/product-detail/dealerDetails.jsx";
import AddPostPage from "@/pages/products/addPost.jsx";

import '@/assets/css/my-style.css'
import {SmartToastContainer} from "@/components/custom/ToastContainer.jsx";
import MyOrdersPage from "@/pages/myOrders.jsx";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const delta = 5;
    let navbarHeight = 0;
    let didScroll = false;
    const header = document.querySelector("header");

    const handleScroll = () => {
      didScroll = true;
    };

    const checkScroll = () => {
      if (didScroll && header) {
        const st = window.scrollY || document.documentElement.scrollTop;
        navbarHeight = header.offsetHeight;

        if (st > navbarHeight) {
          if (st > lastScrollTop + delta) {
            // Scroll down
            header.style.top = `-${navbarHeight}px`;
          } else if (st < lastScrollTop - delta) {
            // Scroll up
            header.style.top = "0";
            header.classList.add("header-bg");
          }
        } else {
          // At top of page
          header.style.top = "";
          header.classList.remove("header-bg");
        }

        lastScrollTop = st;
        didScroll = false;
      }
    };

    // Initial measurement
    if (header) {
      navbarHeight = header.offsetHeight;
    }

    // Set up event listeners
    window.addEventListener("scroll", handleScroll);
    const scrollInterval = setInterval(checkScroll, 250);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(scrollInterval);
    };
  }, [pathname]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);

  return (
    <>
      <SmartToastContainer />
      <div id="wrapper">
        <Context>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage2 />} />
              <Route path="" element={<HomePage2 />} />
              <Route path="home-2" element={<HomePage2 />} />

              <Route path="shop/:id/:title" element={<ShopFullwidthPage />} />
              <Route path="shop" element={<ShopFullwidthPage />} />
                {/*<Route path="shop-default" element={<ShopDefaultPage />} />*/}
              <Route
                path="shop-right-sidebar"
                element={<ShopRightSidebarPage />}
              />
              <Route path="shop-fullwidth" element={<ShopFullwidthPage />} />
              <Route path="shop-cart" element={<ShopCartPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="my-orders" element={<MyOrdersPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="add-post" element={<AddPostPage />} />
              <Route path="order-details" element={<OrderDetailsPage />} />
              <Route path="track-your-order" element={<TrackYourOrderPage />} />
              <Route path="my-account" element={<MyAccountPage />} />
              {/*<Route*/}
              {/*  path="product-detail/:id"*/}
              {/*  element={<ProductDetailPage />}*/}
              {/*/>*/}
              <Route
                  path="product-detail/:id"
                  element={<ProductInnerCircleZoomPage />}
              />
              <Route
                  path="dealer-detail/:id"
                  element={<DealerDetails />}
              />

              <Route
                path="product-thumbs-right"
                element={<ProductThumbsRightPage />}
              />
              <Route
                path="product-thumbs-left"
                element={<ProductThumbsLeftPage />}
              />
              <Route path="product-detail-2" element={<ProductDetailPage2 />} />
              <Route path="product-detail-3" element={<ProductDetailPage3 />} />
              <Route path="product-detail-4" element={<ProductDetailPage4 />} />
              <Route
                path="product-inner-zoom"
                element={<ProductInnerZoomPage />}
              />
              <Route
                path="product-inner-circle-zoom"
                element={<ProductInnerCircleZoomPage />}
              />
              <Route path="blog-list" element={<BlogListPage />} />
              <Route path="blog-grid" element={<BlogGridPage />} />
              <Route path="blog-detail" element={<BlogDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="404" element={<NotFoundPage />} />

              <Route
                path="my-account-orders"
                element={<MyAccountOrdersPage />}
              />
              <Route
                path="my-account-address"
                element={<MyAccountAddressPage />}
              />
              <Route path="my-account-edit" element={<MyAccountEditPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>

          <Login />
          <Register />
          <Cart />
          <Quickview />
          <Compare />
          <MobileMenu />
          <ScrollTop />
          <Toolbar />
          <Search />
          <NewsLetter />
          <AddParallax />
          <ScrollTopBehaviour />
        </Context>
      </div>
    </>
  );
}

export default App;
