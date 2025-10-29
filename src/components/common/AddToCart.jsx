import {useContextElement} from "@/context/Context";
import {useState} from "react";
import {addToCartAPI} from "@/api/cart.js";

export default function AddToCart({productId, productCategory, tooltipClass = ""}) {
    const {addProductToCart, isAddedToCartProducts,fetchCartFromDB, currentUser} = useContextElement();
    const [added, setAdded] = useState(false)

    const handleToggleCart = async () => {
        if (!currentUser) return alert("Please log in first.");

        try {
            const res = await addToCartAPI(currentUser.id, productId, productCategory);
            if (res) {
                setAdded(true); // update UI
                addProductToCart(productId)
            } else {
                setAdded(false); // already exists or removed
            }
            await fetchCartFromDB();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <a
                href="#shoppingCart"
                data-bs-toggle="offcanvas"
                onClick={() => handleToggleCart()}
                className={`box-icon add-to-cart btn-icon-action hover-tooltip ${tooltipClass}`}
            >
                <span className="icon icon-cart2"/>
                <span className="tooltip">
          {added ? "Already Added" : "Add to Cart"}
        </span>
            </a>
        </>
    );
}
