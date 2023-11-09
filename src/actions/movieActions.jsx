export const GET_MOVIES = "GET_MOVIES";
export const ADD_FAVORITE_MOVIE = "ADD_FAVORITE_MOVIE";
const storedToken = localStorage.getItem("token");

export const getMovies = () => async (dispatch) => {
    try {
        const response = await fetch("https://historic-movies-a728a807961d.herokuapp.com/Movies", {
            headers: { Authorization: `Bearer ${storedToken}` },
        });

        const movieData = await response.json();

        if (movieData) {
            const historyMovieApi = movieData.map((data) => {
                return {
                    id: data._id,
                    title: data.Title,
                    description: data.Description,
                    image: data.Image,
                    director: data.Director,
                    actor: data.Actors,
                    genre: data.Genre,
                    featured: data.Featured,
                };
            });
            dispatch({ type: GET_MOVIES, movies: historyMovieApi });
        }
    } catch (error) {
        console.log(error, "error");
    }
};
