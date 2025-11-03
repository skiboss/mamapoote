// import { axiosInstance } from "./axios";

// export type APIResponse<T> = T & {
//   meta?: {
//     requestId?: string;
//     timestamp?: string;
//   };
//   [key: string]: unknown;
// };

// export interface BaseParams {
//   PageNumber?: number;
//   PageSize?: number;
//   SearchTerm?: string;
// }
// export interface QueryParams extends BaseParams {
//   [key: string]: unknown;
// }

// export async function fetchData<T>(
//   url: string,
//   options: {
//     params?: QueryParams;
//   } = {}
// ): Promise<APIResponse<T>> {
//   const queryParams = new URLSearchParams();

//   // Append params
//   if (options.params) {
//     Object.entries(options.params).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         if (Array.isArray(value)) {
//           value.forEach((item) => queryParams.append(key, String(item)));
//         } else {
//           queryParams.append(key, String(value));
//         }
//       }
//     });
//   }

//   const queryString = queryParams.toString();
//   const finalUrl = queryString ? ${url}?${queryString} : url;

//   const instance = axiosInstance("", {});
//   const response = await instance.get<APIResponse<T>>(finalUrl);
//   return response.data;
// }

// export async function postData<T>(
//   url: string,
//   data?: unknown,
//   options = {}
// ): Promise<APIResponse<T>> {
//   const instance = axiosInstance("", {});
//   const response = await instance.post<APIResponse<T>>(url, data, options);
//   return response.data;
// }

// export async function putData<T>(
//   url: string,
//   data?: unknown,
//   options = {}
// ): Promise<APIResponse<T>> {
//   const instance = axiosInstance("", {});
//   const response = await instance.put<APIResponse<T>>(url, data, options);
//   return response.data;
// }

// export async function deleteData<T>(
//   url: string,
//   options = {}
// ): Promise<APIResponse<T>> {
//   const instance = axiosInstance("", {});
//   const response = await instance.delete<APIResponse<T>>(url, options);
//   return response.data;
// }