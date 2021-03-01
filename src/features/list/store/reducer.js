import {
  GET_ALL_TASKS_FROM_API_SUCCESS,
  DELETE_TASK_SUCCESS,
  CHANGE_TASK_STATUS_SUCCESS,
  ADD_NEW_TASK_SUCCESS
} from "./constants";

const initialState = {
  allTasks: [],
  activeTasks: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS_FROM_API_SUCCESS:
      state.allTasks = action.payload;
      state.activeTasks = action.payload;
      return state;

    case DELETE_TASK_SUCCESS:
      const newArray = state.allTasks.filter(
        item => item.id !== action.payload
      );
      state.allTasks = newArray;
      state.activeTasks = newArray;
      return state;

    case CHANGE_TASK_STATUS_SUCCESS:
      const task = state.allTasks.find(item => item.id === action.payload);
      task.status = "Done";
      const newArrayActiveStatus = state.allTasks.filter(
        item => item.status !== "Done"
      );
      state.activeTasks = newArrayActiveStatus;
      return state;

    case ADD_NEW_TASK_SUCCESS:
      let activeTasks = [...state.activeTasks];
      let allTasks = [...state.allTasks];
      activeTasks.push(action.payload);
      allTasks.push(action.payload);
      return {
        ...state,
        activeTasks,
        allTasks
      };

    default:
      return state;
  }
};

export default listReducer;
