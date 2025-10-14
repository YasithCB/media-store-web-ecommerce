import { useContextElement } from "@/context/Context";

export default function AddToCompare({ productId, tooltipClass = "" }) {
  const { addToCompareItem, isAddedToCompareItem } = useContextElement();
  return (
    <a
      href="#compare"
      data-bs-toggle="offcanvas"
      onClick={() => addToCompareItem(productId)}
      className={`box-icon btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span className="icon icon-compare1" />
      <span className="tooltip">
        {" "}
        {isAddedToCompareItem(productId) ? "Compared" : "Compare"}
      </span>
    </a>
  );
}
