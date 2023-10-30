import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
<<<<<<< Updated upstream
                setMovies(historyMovieApi);
            })
            .catch((error) => {
                console.error("Error:", error);
=======

                setMovies(booksFromApi);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
            });
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflixmoviedb.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, [token]);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
<<<<<<< Updated upstream
=======
                    }}
                />
                or
                <SignupView />
            </>
        );
    }
=======
            });
    }, []);

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
>>>>>>> Stashed changes
    if (selectedBook) {
        return <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />;
    }

    if (books.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    onBookClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                    }}
                />
                or
                <SignupView />
            </>
        );
    }
    const updatedMovie = movies.map((movie) => {
        return (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            />
        );
    });
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
