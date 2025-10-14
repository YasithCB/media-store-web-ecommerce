// api/authApi.js
import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const login = async (data) => {
    // data = { phone, password }
    return fetchWrapper("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const signup = async (data) => {
    // data = { name, email, password, phone }
    return fetchWrapper("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
};
