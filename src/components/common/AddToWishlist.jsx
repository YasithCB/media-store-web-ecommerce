import { useContextElement } from "@/context/Context";
import { addToWishList, removeFromWishList } from "@/api/wishlist.js";
import { useState, useEffect } from "react";
import LoadingDots from "@/components/custom/loadingDots.jsx";

export default function AddToWishlist({ productId, productCategory, tooltipClass = "" }) {
    const { currentUser, wishList, setWishList } = useContextElement();
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    // Update local `added` state whenever `wishList` changes
    useEffect(() => {
        const exists = wishList?.some(item => item.id === productId);
        setAdded(!!exists);
    }, [wishList, productId]);

    const handleToggleWishlist = async () => {
        if (!currentUser) {
            return alert("Please log in first.");
        }

        setLoading(true);

        try {
            if (!added) {
                // Optimistically update local state
                setWishList(prev => [...prev, { id: productId, category_title: productCategory }]);
                setAdded(true);

                // Call backend
                await addToWishList(currentUser.id, productId, productCategory);
            } else {
                // Remove from wishlist
                setWishList(prev => prev.filter(item => item.id !== productId));
                setAdded(false);

                await removeFromWishList(currentUser.id, productId, productCategory);
            }
        } catch (err) {
            console.error("Wishlist update failed:", err);
            // Rollback UI on failure
            setAdded(!added);
            if (!added) {
                setWishList(prev => prev.filter(item => item.id !== productId));
            } else {
                setWishList(prev => [...prev, { id: productId, category_title: productCategory }]);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingDots />;

    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                handleToggleWishlist();
            }}
            className={`box-icon btn-icon-action hover-tooltip ${tooltipClass} ${added ? 'bg-dark text-white' : ''}`}
        >
            <span className='icon-heart2' />
            <span className="tooltip">{added ? "Remove from Wishlist" : "Add to Wishlist"}</span>
        </a>
    );
}
