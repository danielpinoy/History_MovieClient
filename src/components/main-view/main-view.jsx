import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

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
        fetch("https://historic-movies-a728a807961d.herokuapp.com/Movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
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
    }, [token]);

    const updatedMovie = movies.map((movie) => {
        return (
            <Col key={movie.id} md={4} className="mb-4">
                <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                />
            </Col>
        );
    });

    return (
        <Row>
            {!user ? (
                <>
                    <Col md={5}>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }}
                        />
                        or
                        <SignupView />
                    </Col>
                </>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                updatedMovie
            )}
            <Col md={12} className="mt-2">
                <button
                    className="bg-danger"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}>
                    Logout
                </button>
            </Col>
        </Row>
    );
};
