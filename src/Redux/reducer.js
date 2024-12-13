import { CLEAR_USER, GET_USER_BY_ID } from "./types";

const initialState = {
  user: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BY_ID:
      // console.log("Usuario en reducer: ", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };

    default: {
      return state;
    }
  }
}

export default rootReducer;
