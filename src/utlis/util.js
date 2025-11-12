export const getImageUrl = (path) => {
    if (!path) return `${import.meta.env.VITE_API_BASE_URL}/uploads/default-image.png`;

    // If it's a blob URL or File object
    if (typeof path !== "string") {
        // If it's a File object, create a temporary URL
        if (path instanceof File) {
            return URL.createObjectURL(path);
        }
        // Otherwise, fallback
        return `${import.meta.env.VITE_API_BASE_URL}/uploads/default-image.png`;
    }

    if (path.startsWith("blob:")) return path;

    // Normalize path
    let cleanPath = path.replace(/\\/g, "/"); // convert backslashes
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1); // remove leading slash

    return `${import.meta.env.VITE_API_BASE_URL}/${cleanPath}`;
};

export const getFirstPhoto = (photos) => {
    if (!photos) return null;
    try {
        const arr = typeof photos === 'string' ? JSON.parse(photos) : photos;
        return Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
    } catch {
        return null;
    }
};

// utils/recentlyViewe
export const getRecentlyViewed = () => {
    const data = localStorage.getItem("media_store_recentlyViewed") || "[]";
    return JSON.parse(data);
};

export const addRecentlyViewed = (product) => {
    if (!product || !product.id) return; // <-- skip invalid product

    let products = getRecentlyViewed();

    // Remove duplicates
    products = products.filter(p => p.id !== product.id);

    // Add to start
    products.unshift(product);

    // Keep only last 10 items
    if (products.length > 10) products = products.slice(0, 10);

    localStorage.setItem("media_store_recentlyViewed", JSON.stringify(products));
};



