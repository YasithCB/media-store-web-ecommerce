import React, { useEffect, useState, useContext } from "react";
import { allProducts } from "@/data/products";
// import { openCartModal } from "@/utlis/openCartModal";
// import { openWishlistModal } from "@/utlis/openWishlist";

const dataContext = React.createContext();

export default function Context({ children }) {
    // 🛒 CART + WISHLIST STATE
    const [cartProducts, setCartProducts] = useState([]);
    const [wishList, setWishList] = useState([1, 2, 3]);
    const [compareItem, setCompareItem] = useState([1, 2, 3, 4]);
    const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
    const [quickAddItem, setQuickAddItem] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    // 👤 AUTH STATE
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    // Calculate total price
    useEffect(() => {
        const subtotal = cartProducts.reduce(
            (acc, product) => acc + product.quantity * product.price,
            0
        );
        setTotalPrice(subtotal);
    }, [cartProducts]);

    // Cart functions
    const isAddedToCartProducts = (id) =>
        !!cartProducts.find((elm) => elm.id === id);

    const addProductToCart = (id, qty, isModal = true) => {
        if (!isAddedToCartProducts(id)) {
            const item = {
                ...allProducts.find((elm) => elm.id === id),
                quantity: qty ? qty : 1,
            };
            setCartProducts((prev) => [...prev, item]);
            // if (isModal) openCartModal();
        }
    };

    const updateQuantity = (id, qty) => {
        if (isAddedToCartProducts(id) && qty >= 1) {
            setCartProducts((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity: qty / 1 } : item
                )
            );
        }
    };

    // Wishlist functions
    const addToWishlist = (id) => {
        setWishList((prev) =>
            prev.includes(id)
                ? prev.filter((elm) => elm !== id)
                : [...prev, id]
        );
    };

    const removeFromWishlist = (id) =>
        setWishList((prev) => prev.filter((elm) => elm !== id));

    const isAddedToWishlist = (id) => wishList.includes(id);

    // Compare functions
    const addToCompareItem = (id) =>
        setCompareItem((prev) =>
            prev.includes(id) ? prev : [...prev, id]
        );

    const removeFromCompareItem = (id) =>
        setCompareItem((prev) => prev.filter((elm) => elm !== id));

    const isAddedToCompareItem = (id) => compareItem.includes(id);

    // LocalStorage sync — CART & WISHLIST
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartList"));
        if (storedCart?.length) setCartProducts(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }, [cartProducts]);

    useEffect(() => {
        const storedWish = JSON.parse(localStorage.getItem("wishlist"));
        if (storedWish?.length) setWishList(storedWish);
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, [wishList]);

    // 🧠 AUTH — load from localStorage once
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("auth_token");
        if (user && token) {
            setCurrentUser(user);
            setAuthToken(token);
        }
    }, []);

    // 🧠 AUTH — update localStorage when auth changes
    useEffect(() => {
        if (currentUser && authToken) {
            localStorage.setItem("user", JSON.stringify(currentUser));
            localStorage.setItem("auth_token", authToken);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("auth_token");
        }
    }, [currentUser, authToken]);

    const logout = () => {
        setCurrentUser(null);
        setAuthToken(null);
    };

    // Combine all context data
    const contextElement = {
        // 🛒 Cart & wishlist
        cartProducts,
        setCartProducts,
        totalPrice,
        addProductToCart,
        isAddedToCartProducts,
        removeFromWishlist,
        addToWishlist,
        isAddedToWishlist,
        quickViewItem,
        setQuickViewItem,
        quickAddItem,
        setQuickAddItem,
        addToCompareItem,
        isAddedToCompareItem,
        removeFromCompareItem,
        compareItem,
        setCompareItem,
        updateQuantity,

        // 👤 Auth
        currentUser,
        setCurrentUser,
        authToken,
        setAuthToken,
        logout,
    };

    return (
        <dataContext.Provider value={contextElement}>
            {children}
        </dataContext.Provider>
    );
}

export const useContextElement = () => useContext(dataContext);


