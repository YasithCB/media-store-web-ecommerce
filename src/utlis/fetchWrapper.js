export const fetchWrapper = async (url, options = {}) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            headers: { "Content-Type": "application/json" },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
