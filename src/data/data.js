// auth.js
const auth = {
    currentUser: null,
    authToken: null,
};

export const setAuth = (user, token) => {
    auth.currentUser = user;
    auth.authToken = token;
};

export const getAuth = () => auth;

export default auth;
