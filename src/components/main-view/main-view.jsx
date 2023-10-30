import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")),
        storedToken = localStorage.getItem("token"),
        [user, setUser] = useState(storedUser ? storedUser : null),
        [token, setToken] = useState(storedToken ? storedToken : null),
        [movies, setMovies] = useState([]),
        [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://historic-movies-a728a807961d.herokuapp.com/Movies")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const historyMovieApi = data.map((data) => {
                    return {
                        id: data._id,
                        title: data.Title,
                        description: data.Description,
                        director: data.Director,
                        actor: data.Actors,
                        genre: data.Genre,
                        featured: data.Featured,
                    };
                });
                setMovies(historyMovieApi);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                movies={movies}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    const updatedMovie = movies.map((movie) => (
        <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
        />
    ));

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://historic-movies-a728a807961d.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {updatedMovie}
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}>
                Logout
            </button>
        </div>
    );
};

export default MainView;
