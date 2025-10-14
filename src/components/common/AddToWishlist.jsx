import { useContextElement } from "@/context/Context";
export default function AddToWishlist({ productId, tooltipClass = "" }) {
  const { addToWishlist, isAddedToWishlist } = useContextElement();
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        addToWishlist(productId);
      }}
      className={`box-icon btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span
        className={`icon ${
          isAddedToWishlist(productId) ? "icon-trash" : "icon-heart2"
        } `}
      />
      <span className="tooltip">
        {" "}
        {isAddedToWishlist(productId) ? "Remove Wishlist" : "Add to Wishlist"}
      </span>
    </a>
  );
}
