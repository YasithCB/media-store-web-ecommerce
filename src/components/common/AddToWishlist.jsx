import { useContextElement } from "@/context/Context";
import {addToWishList} from "@/api/wishlist.js";
import {useState} from "react";
import LoadingDots from "@/components/custom/loadingDots.jsx";
export default function AddToWishlist({ productId, productCategory, tooltipClass = "" }) {

  const { addToWishlist, isAddedToWishlist, currentUser } = useContextElement();
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

    const handleToggleWishlist = async () => {
        if (!currentUser) return alert("Please log in first.");

        try {
            setLoading(true);
            const res = await addToWishList(currentUser.id, productId, productCategory);
            if (res) {
                setAdded(true); // update UI
            } else {
                setAdded(false); // already exists or removed
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

  if (loading) return <LoadingDots />

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleToggleWishlist()
        addToWishlist(productId);
      }}
      className={`box-icon btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span
        className={`icon ${
          added ? "icon-trash" : "icon-heart2"
        } `}
      />
      <span className="tooltip">
        {" "}
        {added ? "Remove Wishlist" : "Add to Wishlist"}
      </span>
    </a>
  );
}
