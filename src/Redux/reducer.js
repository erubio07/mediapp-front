import { CLEAR_USER } from "./types";

const initialState = {
  user: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
