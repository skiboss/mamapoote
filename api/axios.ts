// import axios from "axios";
// import Cookies from "js-cookie";

// const baseURL =
//   "https://mamapoote.vercel.app/api";

// export const axiosInstance = (
//   p0: string,
//   headers: Record<string, string> | undefined
// ) => {
//   const token = Cookies.get("token");

//   return axios.create({
//     baseURL,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       ...(token && { Authorization: Bearer ${token} }),
//       ...headers,
//     },
//   });
// };