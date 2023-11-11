import { configureStore } from "@reduxjs/toolkit";
import { userReducer, asyncUserReducer } from "../reducers/userReducer"; // Import your root reducer
import movieReducer from "../reducers/movieReducer";
// Create and configure the Redux store
const store = configureStore({
    reducer: {
        user: userReducer,
        user: asyncUserReducer,
        movies: movieReducer,
    },
});

export default store;
