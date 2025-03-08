const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async function apiRequest(method, endpoint, data = null, authRequired = true) {
     try {
       const url = `${API_BASE_URL}${endpoint}`;
       const options = {
         method,
         headers: {
           "Content-Type": "application/json",
         },
       };
   
       // Add Authorization header only if authRequired is true
       if (authRequired) {
         const token = localStorage.getItem("accessToken");
         if (token) {
           options.headers["Authorization"] = `Bearer ${token}`;
         }
       }
   
       if (data && method !== "GET") {
          options.body = JSON.stringify(data);
       }
   
       const response = await fetch(url, options);
       const result = await response.json();
   
       // Return success status, data, and status code
       return {
         success: response.ok,
         status: response.status,
         data: result,
       };
     } catch (error) {
       return {
         success: false,
         status: 500,
         error: error.message,
       };
     }
   }
   