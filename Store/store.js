import React from "react";
import { createStore, combineReducers } from "redux";
import { listReducer, userReducer } from "./lists";

const allReducers = combineReducers({
  lists: listReducer,
  userSettings: userReducer,
});
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe((store)=> console.log("subscribe", store.getState()))

export default store;
