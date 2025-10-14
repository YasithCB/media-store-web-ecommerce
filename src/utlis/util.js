import {BASEURL} from "@/data/constants.js";

export const getImageUrl = (path) => {
    if (!path) return `${BASEURL}/uploads/default-image.png`;

    // Normalize path
    let cleanPath = path.replace(/\\/g, "/"); // convert backslashes
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1); // remove leading slash

    return `${BASEURL}/${cleanPath}`;
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


