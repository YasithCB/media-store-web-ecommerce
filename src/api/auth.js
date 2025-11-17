// api/authApi.js
import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const login = async (data, role) => {
    // data = { phone, password }
    return fetchWrapper(`/auth/login/${role}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const signup = async (data) => {
    // data = { name, email, password, phone }
    return fetchWrapper(`/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
    });
};

// new → send reset code to email
export function forgotPassword(data, role) {
    // data = { email }
    return fetchWrapper(`/auth/forgot-password/${role}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

// new → verify code + update password
export function resetPassword(data, role) {
    // data = { email, code, newPassword }
    return fetchWrapper(`/auth/reset-password/${role}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

// send OTP
export function sendOtp(data, role) {
    return fetchWrapper(`/auth/send-otp/${role}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

// verify OTP
export function verifyOtp(data) {
    return fetchWrapper(`/auth/verify-otp`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}
