import { CLEAR_USER, GET_USER_BY_ID } from "./types";
import axios from "axios";

export const getUserById = (id) => {
  // console.log("UserId en Actions: ", id);
  return async function (dispatch) {
    let user = await axios.get(
      `https://molecular-ferdinande-ezequielrubio-c5ad57aa.koyeb.app/user/${id}`
    );
    // console.log(user);
    return dispatch({
      type: GET_USER_BY_ID,
      payload: user.data,
    });
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};
