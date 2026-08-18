import { CLEAR_USER, GET_USER_BY_ID } from "./types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
    }
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};
