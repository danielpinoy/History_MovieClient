import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer"; // Import your root reducer
import movieReducer from "../reducers/movieReducer";
// Create and configure the Redux store
const store = configureStore({
    reducer: {
        user: userReducer,
        movies: movieReducer,
    },
});

export default store;
