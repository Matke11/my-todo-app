import {
  GET_ALL_TASKS_FROM_API_SUCCESS,
  DELETE_TASK_SUCCESS,
  CHANGE_TASK_STATUS_SUCCESS
} from "./constants";

const initialState = {
  allTasks: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS_FROM_API_SUCCESS:
      state.allTasks = action.payload;
      return state;

    case DELETE_TASK_SUCCESS:
      const newArray = state.allTasks.filter(
        item => item.id !== action.payload
      );
      state.allTasks = newArray;
      return state;

    case CHANGE_TASK_STATUS_SUCCESS:
      const task = state.allTasks.find(item => item.id === action.payload);
      task.status = "Done";
      const newArrayActiveStatus = state.allTasks.filter(
        item => item.status !== "Done"
      );
      state.allTasks = newArrayActiveStatus;
      return state;

    default:
      return state;
  }
};

export default listReducer;
