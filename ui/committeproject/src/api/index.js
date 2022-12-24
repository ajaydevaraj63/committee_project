import axios from "axios";

//axios instance
const API = axios.create({ baseURL: "https://dev-recreation.innovaturelabs.com/api" });

//for adding the json token to the middleware,
 API.interceptors.request.use((req) => {
   if (localStorage.getItem("Profile")) {
     req.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
   }
   return req;
 });
//  `Bearer ${
//   JSON.parse(localStorage.getItem("Profile")).token
// }`
//posts API calls



//Auth API calls
export const signin = (formData) => API.post("/Auth/Googlogin/LoginCheck", formData);
export const signup = (formData) => API.post("/user/signup", formData);

//forgot password API calls
export const forgotpassword = (email) =>
  API.post("/user/forgotPassword", email);
export const resetpassword = (formData, id, token) =>
  API.post(`/user/reset-password/${id}/${token}`, formData);
