import {
    GET_MOVIES_REQUEST,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILURE,
} from "../actions/movieActions";
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
    movies: [],
};
const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case GET_MOVIES_SUCCESS: {
            console.log(action.movies);
            return {
                ...state,
                loading: false,
                movies: [...state.movies, ...action.movies],
            };
        }
        case GET_MOVIES_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        default:
            return state;
    }
};

export default movieReducer;
