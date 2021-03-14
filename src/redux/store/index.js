import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

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
