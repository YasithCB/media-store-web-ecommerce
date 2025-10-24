import React, { useEffect, useState, useContext } from "react";
import { allProducts } from "@/data/products";
import {getWishlistByUser, removeFromWishList as removeFromWishListAPI} from "@/api/wishlist.js";

const dataContext = React.createContext();

export default function Context({ children }) {
    // 🛒 CART + WISHLIST STATE
    const [cartProducts, setCartProducts] = useState([]);

    const [wishList, setWishList] = useState(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist"));
        return Array.isArray(stored) ? stored : [];
    });

    const [compareItem, setCompareItem] = useState([1, 2, 3, 4]);
    const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
    const [quickAddItem, setQuickAddItem] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    // 👤 AUTH STATE
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    const fetchWishlistFromDB = async () => {
        if (!currentUser) return;
        try {
            const res = await getWishlistByUser(currentUser.id);
            setWishList(res.data || []);
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
        }
    };

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
        console.log('wishList from ctx')
        console.log(wishList)
    };


    const removeFromWishlist = async (postId, postCategory) => {
        if (!currentUser) return alert("Please log in first.");

        // Optimistic update: remove from local state immediately
        setWishList((prev) =>
            prev.filter((item) => !(item.post_id === postId && item.post_category === postCategory))
        );

        try {
            // Remove from backend DB
            let res = await removeFromWishListAPI(currentUser.id, postId, postCategory)
            if (res.status === 'success') {
                fetchWishlistFromDB()
            }
        } catch (err) {
            console.error("Failed to remove from wishlist:", err);
            // Rollback: add it back in case of error
            setWishList((prev) => [...prev, { post_id: postId, post_category: postCategory }]);
        }
    };


    const isAddedToWishlist = (postId, postCategory) => {
        if (!Array.isArray(wishList)) return false; // ✅ safeguard
        return wishList.some(item => item.post_id === postId);
    };


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

        // Wishlist
        wishList,
        fetchWishlistFromDB,
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


