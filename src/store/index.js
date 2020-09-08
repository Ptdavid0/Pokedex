import { createStore } from "redux";

const INITIAL_STATE = {
  data: 10,
};

function pageLimit(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LIMIT":
      return {  data: action.limit };
    default:
      return state;
  }
}

const store = createStore(pageLimit);

export default store;
