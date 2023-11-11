import { LOG_OUT, EDIT_USER, DELETE_USER, UNFAVORITE_MOVIE } from "../actions/userActions";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/userActions";
import {
    ADD_FAVORITE_MOVIE_REQUEST,
    ADD_FAVORITE_MOVIE_SUCCESS,
    ADD_FAVORITE_MOVIE_FAILURE,
    DELETE_FAVORITE_MOVIE_REQUEST,
    DELETE_FAVORITE_MOVIE_SUCCESS,
    DELETE_FAVORITE_MOVIE_FAILURE,
} from "../actions/userActions";
const storedUser = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user: storedUser ? storedUser : null,
};
const asyncUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.user,
            };
        case ADD_FAVORITE_MOVIE_REQUEST:
            return {
                loading: true,
                error: null,
            };
        case ADD_FAVORITE_MOVIE_SUCCESS:
            return {
                loading: false,
                user: action.user,
            };
        case ADD_FAVORITE_MOVIE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.user,
            };

        case DELETE_FAVORITE_MOVIE_REQUEST:
            return {
                loading: true,
                error: null,
                user: action.user,
            };
        case DELETE_FAVORITE_MOVIE_SUCCESS:
            return {
                loading: false,
                user: action.user,
            };
        case DELETE_FAVORITE_MOVIE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.user,
            };
        default:
            return state;
    }
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return action.user;
        case LOG_OUT:
            return null;
        case EDIT_USER:
            return action.user;
        case DELETE_USER:
            return null;
        case UNFAVORITE_MOVIE:
            return action.user;
        default:
            return state;
    }
};

export { userReducer, asyncUserReducer };
