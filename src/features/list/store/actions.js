import axios from "axios";
import {
  GET_ALL_TASKS_FROM_API_REQUEST,
  GET_ALL_TASKS_FROM_API_FAIL,
  GET_ALL_TASKS_FROM_API_SUCCESS,
  DELETE_TASK_SUCCESS,
  CHANGE_TASK_STATUS_SUCCESS,
  ADD_NEW_TASK_SUCCESS,
  SORT_LIST_OF_TASK_SUCCESS
} from "./constants";

const getAllTasksFromApiRequest = () => {
  return {
    type: GET_ALL_TASKS_FROM_API_REQUEST
  };
};

const getAllTasksFromApiFail = error => {
  return {
    type: GET_ALL_TASKS_FROM_API_FAIL,
    error: error
  };
};

const getAllTasksFromApiSuccess = data => {
  return {
    type: GET_ALL_TASKS_FROM_API_SUCCESS,
    payload: data
  };
};

export const getAllTasksFromApi = () => dispatch => {
  dispatch(getAllTasksFromApiRequest());
  return axios
    .get(
      `https://gist.githubusercontent.com/IvonaPilcevic/327330ac09f8ad08003026c910e9aef1/raw/0d97688c128849c5ba9811c122c2ed32579fdb9f/gistfile1.txt`
    )
    .then(response => {
      dispatch(getAllTasksFromApiSuccess(response.data));
    })
    .catch(error => {
      dispatch(getAllTasksFromApiFail(error));
    });
};

export const deleteTask = id => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: id
  };
};

export const changeTaskStatus = id => {
  return {
    type: CHANGE_TASK_STATUS_SUCCESS,
    payload: id
  };
};

export const addNewTask = data => {
  return {
    type: ADD_NEW_TASK_SUCCESS,
    payload: data
  };
};

export const sortListOfTasksAction = value => {
  return {
    type: SORT_LIST_OF_TASK_SUCCESS,
    payload: value
  };
};
