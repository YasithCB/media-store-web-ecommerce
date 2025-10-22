import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getAllStudios = async () => {
    return fetchWrapper("/studio-posts");
};

