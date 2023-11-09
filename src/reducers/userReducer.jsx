import {
    LOG_IN,
    LOG_OUT,
    EDIT_USER,
    DELETE_USER,
    ADD_FAVORITE_MOVIE_TO_USER,
    UNFAVORITE_MOVIE,
} from "../actions/userActions";

const storedUser = JSON.parse(localStorage.getItem("user"));

// state = storedUser ? storedUser seems to be the problem
// As I console.log everything, and no problems with the flow of data in my redux
const userReducer = (state = storedUser ? storedUser : null, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.user;
        case LOG_OUT:
            return {
                ...state,
                user: null,
            };
        case EDIT_USER:
            return action.user;
        case DELETE_USER:
            return;
        case ADD_FAVORITE_MOVIE_TO_USER:
            return action.user;
        case UNFAVORITE_MOVIE:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;
