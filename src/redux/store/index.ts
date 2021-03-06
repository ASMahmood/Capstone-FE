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

export const initalState = {
  user: {
    _id: "",
    email: "",
    username: "",
    associates: [],
    rooms: [],
    profilePic: "",
    bioImage: "",
  },
  error: {
    message: "",
    code: 0,
    severity: "",
  },
  loading: true,
  room: {
    canvases: [],
    participants: [],
    onlineParticipants: [],
    chatHistory: [],
    name: "",
    images: "",
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
