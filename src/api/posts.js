import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getPostById = async (id) => {
    return fetchWrapper(`/posts/${id}`);
};

export const getPostsByUserId = async (userId) => {
    return fetchWrapper(`/posts/user/${userId}`);
};

// Delete a post by ID
export const deletePostById = async (postId) => {
    if (!postId) throw new Error("Post ID is required");

    return fetchWrapper(`/posts/${postId}`, {
        method: "DELETE",
    });
};

export const updatePost = async (path, data) => {
    return fetchWrapper(`/${path}`, {
        method: 'PUT',
        body: data, // supports FormData
    });
};

