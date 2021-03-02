import {
  GET_ALL_TASKS_FROM_API_SUCCESS,
  DELETE_TASK_SUCCESS,
  CHANGE_TASK_STATUS_SUCCESS,
  ADD_NEW_TASK_SUCCESS,
  SORT_LIST_OF_TASK_SUCCESS
} from "./constants";
import { sorter } from "../utils/sorter";

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
      const task = state.activeTasks.find(item => item.id === action.payload);
      task.status = "Done";
      const newArrayActiveStatus = state.activeTasks.filter(
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

    case SORT_LIST_OF_TASK_SUCCESS:
      const newAllTasksArray = sorter(action.payload, state.allTasks);
      const newActiveTasksArray = sorter(action.payload, state.activeTasks);
      state.allTasks = newAllTasksArray;
      state.activeTasks = newActiveTasksArray;
      return state;

    default:
      return state;
  }
};

export default listReducer;
