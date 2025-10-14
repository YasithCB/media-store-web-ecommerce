import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getAllJobs = async () => {
    return fetchWrapper("/job-posts");
};

export const getJobsHiring = async () => {
    return fetchWrapper("/job-posts/hiring");
};

export const getJobsBySubCategoryId = async (id) => {
    return fetchWrapper(`/job-posts/subcategory/${id}`);
};

export const getJobsByName = async (name) => {
    return fetchWrapper(`/job-posts/name/${name}`);
};

