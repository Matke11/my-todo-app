import axios from "axios";
import {
  GET_ALL_TASKS_FROM_API_REQUEST,
  GET_ALL_TASKS_FROM_API_FAIL,
  GET_ALL_TASKS_FROM_API_SUCCESS
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
