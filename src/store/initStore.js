import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import listReducer from "../features/list/store/reducer";

const reducers = combineReducers({
  listReducer
});

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
