import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSlice,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;
