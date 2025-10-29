import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { addToCartAPI } from "@/api/cart.js";

export default function AddToCart({ productId, productCategory, tooltipClass = "" }) {
    const { addProductToCart, isAddedToCartProducts, fetchCartFromDB, currentUser } = useContextElement();
    const [added, setAdded] = useState(false);

    // Sync UI with context
    useEffect(() => {
        setAdded(isAddedToCartProducts(productId));
    }, [isAddedToCartProducts, productId]);

    const handleToggleCart = async () => {
        if (!currentUser) return alert("Please log in first.");

        try {
            const res = await addToCartAPI(currentUser.id, productId, productCategory);
            if (res) {
                addProductToCart(productId); // update context state
            }
            await fetchCartFromDB(); // refresh cart from backend
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={(e) => {
                e.preventDefault();
                handleToggleCart();
            }}
            className={`box-icon add-to-cart btn-icon-action hover-tooltip ${tooltipClass} ${added ? 'bg-dark text-white' : ''}`}
        >
            <span className='icon icon-cart2' />
            <span className="tooltip">{added ? "Already Added" : "Add to Cart"}</span>
        </a>
    );
}
