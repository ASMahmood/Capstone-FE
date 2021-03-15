import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducers from "../reducers/user";
import errorReducers from "../reducers/error";
import loadingReducers from "../reducers/loading";
import roomReducers from "../reducers/room";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initalState = {
  user: {
    email: "",
    username: "",
    friends: [],
    rooms: [],
    profilePic: "",
  },
  error: {
    message: "",
    code: 0,
    severity: "",
  },
  loading: false,
  room: {
    canvases: [],
    participants: [],
    onlineParticipants: [],
    name: "",
  },
};

const fusionOfReducers = combineReducers({
  user: userReducers,
  error: errorReducers,
  loading: loadingReducers,
  room: roomReducers,
});

export default function configureStore() {
  return createStore(
    fusionOfReducers,
    initalState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
