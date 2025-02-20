import axios from 'axios';
import { APIClient } from './api_helper';
import * as url from './url_helper';  // Assuming the URL constants are stored in a separate helper file

const apiClient = new APIClient();

// Create a new barber leave request
export const createBarberLeaveRequest = async (leaveData: {
  availability_status: string;
  date: string;
  reason: string;
 start_time: string;
  end_time: string;
}): Promise<any> => {
  try {
    const response = await axios.post(url.BARBER_LEAVE_REQUEST, leaveData);
    console.log("Leave request submitted:", response);
    return response; // Return the response after the request is successful
  } catch (error) {
    console.error("Error creating barber leave request:", error);
    throw error;
  }
};
