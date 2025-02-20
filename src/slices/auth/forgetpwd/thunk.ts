import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import axios from 'axios'; // Import Axios
import { sendResetPassword } from "Services/AuthService";
const USERS_ENDPOINT = 'users';


interface ErrorResponse {
  error: string; // Error message from the API response
}

// Create a new user
export const userForgetPassword = async (email: any): Promise<any> => {
  try {
    const payload = { email };
    const response = await axios.post(`${USERS_ENDPOINT}/send-reset-email`, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

// 'users/send-reset-email',
// export const userForgetPassword =
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await sendResetPassword(email);
//       return response;  // Return the success message
//     } catch (err: any) {
//       // Return a structured error object for rejected cases
//       return rejectWithValue({ error: err.message });
//     }
//   }
// );