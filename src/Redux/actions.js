import { CLEAR_USER, GET_USER_BY_ID } from "./types";
import api from "../services/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/user/${id}`);

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
