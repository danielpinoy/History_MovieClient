// console.log(storedToken);
// actions.js
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const ADD_FAVORITE_MOVIE_TO_USER = "ADD_FAVORITE_MOVIE_TO_USER";
export const UNFAVORITE_MOVIE = "UNFAVORITE_MOVIE";
const storedToken = localStorage.getItem("token");

// action creator

// login action creator
export const login = (username, password) => async (dispatch) => {
    console.log("Fetching movies...");

    const data = {
        Username: username,
        Password: password,
    };

    try {
        const response = await fetch("https://historic-movies-a728a807961d.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const userData = await response.json();

        if (userData.user) {
            dispatch({ type: LOG_IN, user: userData.user });
            localStorage.setItem("user", JSON.stringify(userData.user));
            localStorage.setItem("token", userData.token);
            window.location.reload();
        } else {
            alert("No such user");
        }
    } catch (error) {
        alert("Something went wrong", error);
    }
};

// logout action creator
export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: LOG_OUT });
    window.location.reload();
};

// editUser action creator
export const editUser = (userData, updatedUserData, token) => async (dispatch) => {
    try {
        const response = await fetch(
            `https://historic-movies-a728a807961d.herokuapp.com/user/${userData.Username}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUserData),
            }
        );

        const updatedUser = await response.json();

        dispatch({ type: EDIT_USER, user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

// deleteUser action creator
export const deleteUser = (user, token) => async (dispatch) => {
    try {
        const response = await fetch(
            `https://historic-movies-a728a807961d.herokuapp.com/user/${user._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            localStorage.clear();
            dispatch({ type: DELETE_USER });
            window.location.reload();
        } else {
            console.error("Failed to delete the user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

export const addFavoriteMovieToUser = (userId, movieId) => async (dispatch) => {
    try {
        const response = await fetch(
            "https://historic-movies-a728a807961d.herokuapp.com/user/addfavorite",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, movieId }),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const updatedUser = await response.json();
        console.log(updatedUser.FavoriteMovie, "updatedUser");
        window.location.reload();

        dispatch({ type: ADD_FAVORITE_MOVIE_TO_USER, user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Error adding movie to favorites:", error);
    }
};
export const unFavoriteMovie = (user, movieId) => async (dispatch) => {
    try {
        const encodedMovieId = encodeURIComponent(movieId);
        console.log(encodedMovieId);
        const response = await fetch(
            `https://historic-movies-a728a807961d.herokuapp.com/user/${user._id}/${encodedMovieId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                },
            }
        );

        const deletedFavoriteMovieFromUser = await response.json();

        const updatedUser = {
            ...user,
            FavoriteMovies: user.FavoriteMovies.filter((movie) => movie !== movieId),
        };
        window.location.reload();
        console.log(updatedUser);
        dispatch({ type: UNFAVORITE_MOVIE, user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Error removing movie to favorites:", error);
    }
};
