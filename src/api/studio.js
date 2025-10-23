import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getAllStudios = async () => {
    return fetchWrapper("/studio-posts");
};

export const getStudioByName = async (name) => {
    return fetchWrapper(`/studio-posts/name/${name}`);
};