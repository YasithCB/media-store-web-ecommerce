import { useContextElement } from "@/context/Context";

export default function AddToQuickview({ product, tooltipClass = "" }) {
    const { setQuickViewItem,quickViewItem } = useContextElement();

    const handleQuickView = () => {
        setQuickViewItem(product);
    };

    return (
        <a
            href="#quickView"
            data-bs-toggle="modal"
            onClick={handleQuickView}
            className={`box-icon quickview btn-icon-action hover-tooltip ${tooltipClass}`}
        >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
        </a>
    );
}
