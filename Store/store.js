import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { MODULE_NAME as listsModuleName, listReducer } from "./lists";
import { MODULE_NAME as settingsModuleName, userReducer } from "./settings";
import { MODULE_NAME as authModuleName, authReducer } from "./auth";
import { updateAS, getDataFromAS } from "../utilities/dataStorage";

const allReducers = combineReducers({
  [listsModuleName]: listReducer,
  [settingsModuleName]: userReducer,
  [authModuleName]: authReducer,
});
const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => updateAS(store));

getDataFromAS(store);

export default store;
