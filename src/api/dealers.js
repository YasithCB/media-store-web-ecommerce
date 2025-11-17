import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const createDealer= async (data) => {
    // data = {
    //   dealer_id, name, logo (File), photos (File[]), description, category_id, subcategory_id,
    //   email, phone, whatsapp, website_url, address_line1, address_line2, city, country,
    //   location_map (object), services (object), services_starting_from, working_hours (object),
    //   rating, reviews_count, verified, established_year, featured, tags (array)
    // }

    const formData = new FormData();

    // Append simple fields
    for (const key of [
        "dealer_id", "name", "description", "category_id", "subcategory_id",
        "email","password", "phone", "whatsapp", "website_url",
        "address_line1", "address_line2", "city", "country",
        "services_starting_from", "rating", "reviews_count", "verified",
        "established_year", "featured", 'subcategory_title', 'license_no', 'license_exp_date'
    ]) {
        if (data[key] !== undefined && data[key] !== null) {
            formData.append(key, data[key]);
        }
    }

    // Append JSON fields
    for (const key of ["location_map", "services", "working_hours", "tags"]) {
        if (data[key]) {
            formData.append(key, JSON.stringify(data[key]));
        }
    }

    // Append files
    if (data.logo) {
        formData.append("logo", data.logo);
    }

    if (data.photos && data.photos.length) {
        data.photos.forEach((file) => {
            formData.append("photos", file);
        });
    }

    return fetchWrapper("/dealer/", {
        method: "POST",
        body: formData,
        headers: {
            // Don't set Content-Type! Let the browser set multipart/form-data with boundary
        },
    });
};

export const getTopRatedDealers = async () => {
    return fetchWrapper("/dealer/top-rated");
};

export const getAllDealers = async () => {
    return fetchWrapper("/dealer");
};

export const getDealerBySubCategoryId = async (id) => {
    return fetchWrapper(`/dealer/subcategory/${id}`);
};

export const getDealerById = async (id) => {
    return fetchWrapper(`/dealer/${id}`);
};

export const getDealerByName = async (name) => {
    return fetchWrapper(`/dealer/name/${name}`);
};

export const getOnSaleDealers = async () =>
    fetchWrapper("/dealer/on-sale");
