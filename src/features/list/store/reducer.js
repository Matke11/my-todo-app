import { GET_ALL_TASKS_FROM_API_SUCCESS } from "./constants";

const initialState = {
  allTasks: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS_FROM_API_SUCCESS:
      state.allTasks = action.payload;
      return state;

    default:
      return state;
  }
};

export default listReducer;
