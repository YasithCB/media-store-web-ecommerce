import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getPostById = async (id) => {
    return fetchWrapper(`/posts/${id}`);
};
