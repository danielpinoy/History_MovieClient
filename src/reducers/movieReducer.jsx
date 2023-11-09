import { GET_MOVIES, ADD_FAVORITE_MOVIE, DELETE_FAVORITE_MOVIE } from "../actions/movieActions";

const movieReducer = (state = [], action) => {
    switch (action.type) {
        case GET_MOVIES: {
            console.log("Movies received:", action.movies);
            return [...state, ...action.movies];
        }

        default:
            return state;
    }
};

export default movieReducer;
