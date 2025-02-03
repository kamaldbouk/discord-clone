import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from './reducers/authReducer'
import alertReducer from './reducers/alertReducer';
import friendsReducer from './reducers/friendsReducer'
import chatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import authReducer from "./reducers/authReducer"; // Ensure the correct path

// const store = createStore(authReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default store;


