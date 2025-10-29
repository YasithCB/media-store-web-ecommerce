import React, { useEffect, useState, useContext } from "react";
import { allProducts } from "@/data/products";
import {getWishlistByUser, removeFromWishList as removeFromWishListAPI} from "@/api/wishlist.js";

// 🆕 Optional (add your API endpoints later)
import {
    getCartByUser,
    addToCartAPI,
    removeFromCartAPI,
    updateCartAPI, clearCartByUser
} from "@/api/cart.js";

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

    // CART --------------------------------------------------------------
    useEffect(() => {
        if (currentUser && authToken) {
            fetchCartFromDB();   // 🆕 load user cart
            fetchWishlistFromDB();
        }
    }, [currentUser, authToken]);


    const fetchCartFromDB = async () => {
        if (!currentUser) return;
        try {
            const res = await getCartByUser(currentUser.id);
            setCartProducts(res.data || []);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        }
    };

    const addProductToCart = async (productId, qty = 1) => {
        console.log(`cart add : ${productId}`)
        console.log(`cart list : ${cartProducts}`)

        const existingItem = cartProducts.find((item) => item.id === productId);

        if (existingItem) {
            // If already exists, increase quantity
            const updated = cartProducts.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + qty }
                    : item
            );
            setCartProducts(updated);
            localStorage.setItem("cartList", JSON.stringify(updated));

            // Optional backend update
            if (currentUser) {
                try {
                    await updateCartAPI(currentUser.id, productId, updated.quantity);
                } catch (err) {
                    console.error("Failed to update cart item:", err);
                }
            }
        } else {
            const product = allProducts.find((elm) => elm.id === productId);
            if (!product) return;

            const newItem = { ...product, quantity: qty };
            const updated = [...cartProducts, newItem];
            setCartProducts(updated);
            localStorage.setItem("cartList", JSON.stringify(updated));

            // Optional backend add
            if (currentUser) {
                try {
                    await addToCartAPI(currentUser.id, productId, qty);
                } catch (err) {
                    console.error("Failed to add to cart:", err);
                }
            }
        }
        await fetchWishlistFromDB()
    };

    const removeFromCart = async (productId, category) => {
        // Backend sync if logged in
        if (currentUser) {
            try {
                await removeFromCartAPI(currentUser.id, productId, category);
                await fetchWishlistFromDB()

                // Optimistic update: remove from local state immediately
                setCartProducts((prev) => prev.filter((item) => item.id !== productId));
                localStorage.setItem(
                    "cartList",
                    JSON.stringify(cartProducts.filter((item) => item.id !== productId))
                );
            } catch (err) {
                console.error("Failed to remove from cart:", err);
            }
        }
    };

    const clearCart = async () => {
        // Backend sync if logged in
        if (currentUser) {
            try {
                await clearCartByUser(currentUser.id); // Call your backend API to clear cart
            } catch (err) {
                console.error("Failed to clear cart on server:", err);
            }
        }

        // Clear local state and localStorage
        setCartProducts([]);
        localStorage.setItem("cartList", JSON.stringify([]));
    };


    const isAddedToCartProducts = (id) => {
        return cartProducts.some((item) => item.id === id);
    };

    // CART --------------------------------------------------------------

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
        // 🛒 Cart
        cartProducts,
        setCartProducts,
        totalPrice,
        addProductToCart,
        fetchCartFromDB,
        isAddedToCartProducts,
        removeFromCart,
        clearCart,

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


