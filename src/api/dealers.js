import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getTopRatedDealers = async () => {
    return fetchWrapper("/dealer-posts/top-rated");
};

export const getAllDealers = async () => {
    return fetchWrapper("/dealer-posts");
};

export const getDealerBySubCategoryId = async (id) => {
    return fetchWrapper(`/dealer-posts/subcategory/${id}`);
};

export const getDealerById = async (id) => {
    return fetchWrapper(`/dealer-posts/${id}`);
};

export const getDealerByName = async (name) => {
    return fetchWrapper(`/dealer-posts/name/${name}`);
};

export const getOnSaleDealers = async () =>
    fetchWrapper("/dealer-posts/on-sale");
